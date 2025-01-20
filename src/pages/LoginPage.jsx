import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { CardHeader, CardTitle } from '@/components/ui/card';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    city: ''
  });

  const cities = [
    'Bucaramanga',
    'Bogotá',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <div className="min-h-screen w-full bg-[#1a1a2e] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md px-4 sm:px-6">
        <div className="w-full bg-[#2a2a3e] p-6 md:p-8 border border-[#6b5ffd] rounded-2xl 
                     shadow-[0_0_30px_-6px_#6b5ffd] text-center relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#6b5ffd20] to-[#6b5ffd10] opacity-50"></div>

          {/* Content */}
          <div className="relative z-10">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#3a3a4e] flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-[#6b5ffd]" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-8">
              ¡Bienvenido a Campuslands!
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Phone */}
              <div className="space-y-2">
                <Label className="text-white text-left block text-sm">
                  Teléfono
                </Label>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center px-3 py-2 border border-r-0 border-[#6b5ffd] rounded-l-lg bg-[#3a3a4e]">
                      <img
                        src="/api/placeholder/24/24"
                        alt="Colombia flag"
                        className="h-5 w-5"
                      />
                      <span className="ml-2 text-gray-400">+57</span>
                    </div>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-r-lg bg-[#3a3a4e] text-white
                             border border-[#6b5ffd] focus:ring-2 focus:ring-[#7c3aed] focus:ring-offset-0
                             transition-all duration-200 hover:bg-[#434360]"
                    placeholder="321 1234567"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label className="text-white text-left block text-sm">
                  Nombre y Apellido
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 
                               group-hover:text-[#6b5ffd] transition-colors duration-200"
                    size={18} />
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full py-2.5 px-4 pl-9 bg-[#3a3a4e] rounded-lg text-white 
                             text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed] 
                             focus:ring-offset-0 transition-all duration-200 hover:bg-[#434360]"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* City */}
              <div className="space-y-2">
                <Label className="text-white text-left block text-sm">
                  Ciudad
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 
                               group-hover:text-[#6b5ffd] transition-colors duration-200"
                    size={18} />
                  <select
                    name="city"
                    required
                    className="w-full py-2.5 px-4 pl-9 bg-[#3a3a4e] rounded-lg text-white 
                             text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed] 
                             focus:ring-offset-0 transition-all duration-200 hover:bg-[#434360]"
                    value={formData.city}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione su ciudad</option>
                    {cities.map(city => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 sm:py-3 px-4 rounded-lg text-sm 
                       cursor-pointer transition-all duration-300 bg-[#6C3AFF] 
                       text-white hover:bg-[#6d28d9] transform hover:scale-[1.02]
                       active:scale-[0.98] hover:shadow-lg"
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;