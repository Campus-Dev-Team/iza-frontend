import React, { useState } from 'react';

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
    <div className="min-h-screen bg-slate-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-xl">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-blue-500" />
          </div>
        </div>

        {/* Título */}
        <h1 className="text-center text-2xl font-bold text-blue-500">
          ¡Bienvenido a Campuslands!
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Teléfono */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
                  <img 
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5Z29uIHBvaW50cz0iMjIuNSAxLjUgMjEgMyAyMiA0IDIwLjUgNS41IDIyLjUgNy41IDIzLjUgNi41IDI0LjUgNy41IDIyLjUgMS41Ii8+PHBhdGggZD0iTTEyIDIyYzUuNTIzIDAgMTAtNC40NzcgMTAtMTBTMTcuNTIzIDIgMTIgMiAyIDYuNDc3IDIgMTJzNC40NzcgMTAgMTAgMTB6Ii8+PC9zdmc+" 
                    alt="Colombia flag"
                    className="h-5 w-5"
                  />
                  <span className="ml-2 text-gray-500">+57</span>
                </div>
              </div>
              <input
                type="tel"
                name="phone"
                required
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-r-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="321 1234567"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Nombre y Apellido */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Nombre y Apellido
            </label>
            <input
              type="text"
              name="name"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          {/* Ciudad */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Ciudad
            </label>
            <select
              name="city"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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

          {/* Botón de Ingresar */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;