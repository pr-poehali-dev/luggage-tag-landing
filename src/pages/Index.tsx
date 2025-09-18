import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    telegram: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Регистрация QR-бирки:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-white hover:text-white/80 font-open-sans transition-colors">
                Как работает
              </a>
              <a href="#contact" className="text-white hover:text-white/80 font-open-sans transition-colors">
                Контакты
              </a>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-travel-orange">
                Войти
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white animate-fade-in">
              <h2 className="text-5xl md:text-6xl font-montserrat font-bold mb-6 leading-tight">
                Умная QR-бирка для
                <span className="block text-travel-white"> путешествий</span>
              </h2>
              <p className="text-xl font-open-sans mb-8 text-white/90 leading-relaxed">
                Никогда больше не потеряйте свой чемодан! Цифровая бирка с QR-кодом поможет вернуть багаж к владельцу быстро и безопасно.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-travel-navy hover:bg-travel-navy/90 text-white px-8 py-4 text-lg font-montserrat">
                  <Icon name="QrCode" size={20} className="mr-2" />
                  Создать QR-бирку
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-travel-orange px-8 py-4 text-lg">
                  <Icon name="Play" size={20} className="mr-2" />
                  Как это работает
                </Button>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="flex justify-center animate-scale-in">
              <div className="relative">
                <img 
                  src="/img/1a849c43-74d2-48a2-b35a-56b33d1693eb.jpg" 
                  alt="QR-бирка на чемодане" 
                  className="w-full max-w-md h-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-travel-orange text-white p-3 rounded-full shadow-lg animate-pulse">
                  <Icon name="MapPin" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20 bg-white/10 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-montserrat font-bold text-white mb-4">
                Зарегистрируйте свою QR-бирку
              </h3>
              <p className="text-xl text-white/90 font-open-sans">
                Заполните контактные данные для создания персональной QR-бирки
              </p>
            </div>

            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-montserrat text-travel-navy flex items-center">
                  <Icon name="UserCircle" size={28} className="mr-3 text-travel-orange" />
                  Ваши данные
                </CardTitle>
                <CardDescription className="text-lg font-open-sans">
                  Эта информация поможет тому, кто найдет ваш чемодан, связаться с вами
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName" className="text-travel-navy font-open-sans font-medium">
                        ФИО *
                      </Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="Иван Иванов"
                        className="mt-2 border-travel-blue/30 focus:border-travel-orange"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-travel-navy font-open-sans font-medium">
                        Телефон *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+7 (900) 123-45-67"
                        className="mt-2 border-travel-blue/30 focus:border-travel-orange"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="telegram" className="text-travel-navy font-open-sans font-medium">
                        Telegram
                      </Label>
                      <Input
                        id="telegram"
                        value={formData.telegram}
                        onChange={(e) => handleInputChange('telegram', e.target.value)}
                        placeholder="@username"
                        className="mt-2 border-travel-blue/30 focus:border-travel-orange"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-travel-navy font-open-sans font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="ivan@example.com"
                        className="mt-2 border-travel-blue/30 focus:border-travel-orange"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-travel-orange hover:bg-travel-orange/90 text-white py-4 text-lg font-montserrat"
                    size="lg"
                  >
                    <Icon name="QrCode" size={20} className="mr-2" />
                    Создать QR-бирку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-montserrat font-bold text-white mb-4">
              Как это работает
            </h3>
            <p className="text-xl text-white/90 font-open-sans max-w-2xl mx-auto">
              Простая и надежная система для защиты вашего багажа в путешествиях
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "UserPlus",
                title: "1. Регистрация",
                description: "Заполните контактные данные и создайте персональную QR-бирку"
              },
              {
                icon: "Luggage",
                title: "2. Прикрепите к багажу",
                description: "Распечатайте QR-код и прикрепите к чемодану или рюкзаку"
              },
              {
                icon: "Smartphone",
                title: "3. Быстрая связь",
                description: "Нашедший отсканирует код и сможет связаться с вами"
              }
            ].map((step, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-center hover:bg-white/20 transition-all duration-300 animate-fade-in">
                <CardContent className="pt-8 pb-6">
                  <div className="bg-travel-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name={step.icon as any} size={32} className="text-white" />
                  </div>
                  <h4 className="text-xl font-montserrat font-bold text-white mb-4">
                    {step.title}
                  </h4>
                  <p className="text-white/90 font-open-sans leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl font-montserrat font-bold text-white mb-8">
                Преимущества TravelTag
              </h3>
              <div className="space-y-6">
                {[
                  {
                    icon: "Shield",
                    title: "Безопасность данных",
                    description: "Ваши контакты защищены и доступны только при сканировании QR-кода"
                  },
                  {
                    icon: "Globe",
                    title: "Работает везде",
                    description: "QR-коды считываются любым смартфоном в любой стране мира"
                  },
                  {
                    icon: "Clock",
                    title: "Мгновенная связь",
                    description: "Нашедший ваш багаж сможет связаться с вами за несколько секунд"
                  },
                  {
                    icon: "Zap",
                    title: "Просто в использовании",
                    description: "Один раз создайте бирку и используйте для всех путешествий"
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-travel-turquoise w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={benefit.icon as any} size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-montserrat font-semibold text-white mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-white/90 font-open-sans">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="bg-white rounded-lg p-6 mb-6">
                    <div className="w-48 h-48 bg-black mx-auto rounded-lg flex items-center justify-center">
                      <Icon name="QrCode" size={128} className="text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-montserrat font-bold text-white mb-2">
                      Ваша QR-бирка
                    </h4>
                    <p className="text-white/90 font-open-sans">
                      Уникальный код для каждого пользователя
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-travel-navy py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Icon name="Luggage" size={32} className="text-travel-orange" />
                <h5 className="text-2xl font-montserrat font-bold text-white">TravelTag</h5>
              </div>
              <p className="text-white/80 font-open-sans leading-relaxed">
                Умные QR-бирки для безопасных путешествий. Защитите свой багаж с помощью современных технологий.
              </p>
            </div>
            
            <div>
              <h6 className="text-xl font-montserrat font-semibold text-white mb-6">
                Контакты
              </h6>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={20} className="text-travel-turquoise" />
                  <span className="text-white/80 font-open-sans">support@traveltag.ru</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={20} className="text-travel-turquoise" />
                  <span className="text-white/80 font-open-sans">+7 (800) 123-45-67</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="MessageCircle" size={20} className="text-travel-turquoise" />
                  <span className="text-white/80 font-open-sans">@traveltag_support</span>
                </div>
              </div>
            </div>
            
            <div>
              <h6 className="text-xl font-montserrat font-semibold text-white mb-6">
                Следите за нами
              </h6>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-travel-orange hover:border-travel-orange">
                  <Icon name="MessageCircle" size={20} />
                </Button>
                <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-travel-orange hover:border-travel-orange">
                  <Icon name="Mail" size={20} />
                </Button>
                <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-travel-orange hover:border-travel-orange">
                  <Icon name="Globe" size={20} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-12 pt-8 text-center">
            <p className="text-white/60 font-open-sans">
              © 2024 TravelTag. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;