import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Profile {
  id: string;
  qrCodeId: string;
  fullName: string;
  phone: string;
  telegram?: string;
  email?: string;
  createdAt: string;
}

const Profile = () => {
  const { qrCode } = useParams<{ qrCode: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!qrCode) {
        setError('Неверный QR-код');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://functions.poehali.dev/6022960f-3f76-4240-b828-e715da1ec250?qrCode=${qrCode}`);
        
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          setError('Профиль не найден');
        }
      } catch {
        setError('Ошибка загрузки профиля');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [qrCode]);

  const openTelegram = (username: string) => {
    window.open(`https://t.me/${username.replace('@', '')}`, '_blank');
  };

  const callPhone = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const sendEmail = (email: string) => {
    window.open(`mailto:${email}`, '_self');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-travel-orange via-travel-turquoise to-travel-blue flex items-center justify-center">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-travel-orange mx-auto mb-4"></div>
            <p className="text-travel-navy font-open-sans">Загружаем профиль...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-travel-orange via-travel-turquoise to-travel-blue">
        {/* Header */}
        <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Luggage" size={32} className="text-white" />
                <h1 className="text-2xl font-montserrat font-bold text-white">TravelTag</h1>
              </div>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-travel-orange"
                onClick={() => window.location.href = '/'}
              >
                На главную
              </Button>
            </nav>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-[80vh]">
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="AlertCircle" size={32} className="text-red-600" />
              </div>
              <h2 className="text-2xl font-montserrat font-bold text-travel-navy mb-4">
                Профиль не найден
              </h2>
              <p className="text-travel-navy/70 font-open-sans mb-6">
                {error || 'Возможно, QR-код поврежден или профиль был удален'}
              </p>
              <Button 
                onClick={() => window.location.href = '/'}
                className="bg-travel-orange hover:bg-travel-orange/90 text-white"
              >
                <Icon name="Home" size={20} className="mr-2" />
                На главную
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-travel-orange via-travel-turquoise to-travel-blue">
      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Luggage" size={32} className="text-white" />
              <h1 className="text-2xl font-montserrat font-bold text-white">TravelTag</h1>
            </div>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-travel-orange"
              onClick={() => window.location.href = '/'}
            >
              На главную
            </Button>
          </nav>
        </div>
      </header>

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <Card className="bg-green-100 border-green-300 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-montserrat font-bold text-green-800">
                    Чемодан найден! 🎉
                  </h3>
                  <p className="text-green-700 font-open-sans">
                    Свяжитесь с владельцем, чтобы вернуть багаж
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Owner Profile */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
            <CardHeader className="text-center pb-4">
              <div className="bg-travel-orange w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="User" size={40} className="text-white" />
              </div>
              <CardTitle className="text-3xl font-montserrat font-bold text-travel-navy">
                {profile.fullName}
              </CardTitle>
              <p className="text-travel-navy/70 font-open-sans">
                Владелец багажа • QR: {profile.qrCodeId}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Contact Methods */}
              <div className="space-y-4">
                <h4 className="text-xl font-montserrat font-semibold text-travel-navy mb-4">
                  Контактная информация:
                </h4>

                {/* Phone */}
                <Button
                  onClick={() => callPhone(profile.phone)}
                  className="w-full bg-travel-blue hover:bg-travel-blue/90 text-white p-6 h-auto justify-start"
                  size="lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-full">
                      <Icon name="Phone" size={24} className="text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-montserrat font-semibold">Позвонить</div>
                      <div className="font-open-sans opacity-90">{profile.phone}</div>
                    </div>
                  </div>
                </Button>

                {/* Telegram */}
                {profile.telegram && (
                  <Button
                    onClick={() => openTelegram(profile.telegram!)}
                    className="w-full bg-travel-turquoise hover:bg-travel-turquoise/90 text-white p-6 h-auto justify-start"
                    size="lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-white/20 p-3 rounded-full">
                        <Icon name="MessageCircle" size={24} className="text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-montserrat font-semibold">Написать в Telegram</div>
                        <div className="font-open-sans opacity-90">{profile.telegram}</div>
                      </div>
                    </div>
                  </Button>
                )}

                {/* Email */}
                {profile.email && (
                  <Button
                    onClick={() => sendEmail(profile.email!)}
                    className="w-full bg-travel-orange hover:bg-travel-orange/90 text-white p-6 h-auto justify-start"
                    size="lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-white/20 p-3 rounded-full">
                        <Icon name="Mail" size={24} className="text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-montserrat font-semibold">Отправить Email</div>
                        <div className="font-open-sans opacity-90">{profile.email}</div>
                      </div>
                    </div>
                  </Button>
                )}
              </div>

              {/* Instructions */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <Icon name="Info" size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-montserrat font-semibold text-blue-800 mb-2">
                        Как связаться с владельцем:
                      </h5>
                      <ul className="space-y-2 text-blue-700 font-open-sans">
                        <li>• Нажмите на кнопку "Позвонить" для быстрой связи</li>
                        <li>• Используйте Telegram для мгновенных сообщений</li>
                        <li>• Отправьте Email с деталями о найденном багаже</li>
                        <li>• Укажите место, где вы нашли чемодан</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Thanks Message */}
              <Card className="bg-travel-navy text-white">
                <CardContent className="p-6 text-center">
                  <Icon name="Heart" size={32} className="text-travel-orange mx-auto mb-3" />
                  <h5 className="font-montserrat font-semibold text-lg mb-2">
                    Спасибо за вашу честность! 🙏
                  </h5>
                  <p className="font-open-sans opacity-90">
                    Благодаря таким людям как вы, путешествия становятся безопаснее для всех
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;