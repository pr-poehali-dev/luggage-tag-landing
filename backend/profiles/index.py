import json
import os
import random
import string
import psycopg2
from typing import Dict, Any, Optional

def generate_qr_code_id() -> str:
    """Generate unique QR code ID"""
    chars = string.ascii_uppercase + string.digits
    code = ''.join(random.choices(chars, k=8))
    return f'QR{code}'

def get_db_connection():
    """Get database connection using DATABASE_URL"""
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise ValueError('DATABASE_URL environment variable not set')
    return psycopg2.connect(database_url)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления профилями пользователей с QR-кодами
    Args: event - dict с httpMethod, body, pathParams
          context - объект с request_id и другими атрибутами
    Returns: HTTP response dict с профилем или ошибкой
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # CORS headers
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    }
    
    # Handle CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        if method == 'POST':
            # Создание нового профиля
            body_data = json.loads(event.get('body', '{}'))
            
            # Валидация обязательных полей
            required_fields = ['fullName', 'phone']
            for field in required_fields:
                if not body_data.get(field):
                    return {
                        'statusCode': 400,
                        'headers': headers,
                        'body': json.dumps({'error': f'Поле {field} обязательно для заполнения'})
                    }
            
            # Генерация уникального QR-кода
            qr_code_id = generate_qr_code_id()
            while True:
                cursor.execute(
                    'SELECT id FROM user_profiles WHERE qr_code_id = %s',
                    (qr_code_id,)
                )
                if cursor.fetchone() is None:
                    break
                qr_code_id = generate_qr_code_id()
            
            # Вставка профиля
            cursor.execute('''
                INSERT INTO user_profiles (qr_code_id, full_name, phone, telegram, email)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id, qr_code_id, full_name, phone, telegram, email, created_at
            ''', (
                qr_code_id,
                body_data['fullName'],
                body_data['phone'],
                body_data.get('telegram'),
                body_data.get('email')
            ))
            
            profile = cursor.fetchone()
            conn.commit()
            
            result = {
                'id': str(profile[0]),
                'qrCodeId': profile[1],
                'fullName': profile[2],
                'phone': profile[3],
                'telegram': profile[4],
                'email': profile[5],
                'createdAt': profile[6].isoformat() if profile[6] else None
            }
            
            return {
                'statusCode': 201,
                'headers': headers,
                'body': json.dumps(result)
            }
        
        elif method == 'GET':
            # Получение профиля по QR-коду
            path_params = event.get('pathParams', {})
            qr_code_id = path_params.get('qrCodeId')
            
            if not qr_code_id:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'QR код не указан'})
                }
            
            cursor.execute('''
                SELECT id, qr_code_id, full_name, phone, telegram, email, created_at
                FROM user_profiles 
                WHERE qr_code_id = %s
            ''', (qr_code_id,))
            
            profile = cursor.fetchone()
            
            if not profile:
                return {
                    'statusCode': 404,
                    'headers': headers,
                    'body': json.dumps({'error': 'Профиль не найден'})
                }
            
            result = {
                'id': str(profile[0]),
                'qrCodeId': profile[1],
                'fullName': profile[2],
                'phone': profile[3],
                'telegram': profile[4],
                'email': profile[5],
                'createdAt': profile[6].isoformat() if profile[6] else None
            }
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(result)
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': headers,
                'body': json.dumps({'error': 'Метод не поддерживается'})
            }
    
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Некорректный JSON'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': f'Внутренняя ошибка сервера: {str(e)}'})
        }
    finally:
        if 'conn' in locals():
            conn.close()