import React, { useRef, useState, useEffect } from "react";
import { Mail, Lock } from "lucide-react";
import { Label } from "@/components/ui/label";
import campushm from "../assets/Campushm.png";
import colombiaFlag from "../assets/colombiaFlag.svg";
import { useNavigate } from "react-router-dom";
import { login } from "../services/loginService";
import { register } from "@/services/registerService";

const phoneInputStyles = {
  container: `flex-1 min-w-0 block w-full`,
  input: `w-full px-3 py-2 rounded-r-lg bg-[#3a3a4e] text-white
          border border-[#6b5ffd] focus:ring-2 focus:ring-[#7c3aed] focus:ring-offset-0
          transition-all duration-200 hover:bg-[#434360]`
};

const LoginPage = () => {
  const navigate = useNavigate();
  const phoneInputRef = useRef(null);
  const itiRef = useRef(null);

  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    city: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cities = ["Bucaramanga", "Bogotá"];

  useEffect(() => {
    if (phoneInputRef.current && window.intlTelInput) {
      itiRef.current = window.intlTelInput(phoneInputRef.current, {
        separateDialCode: true,
        initialCountry: "co",
        preferredCountries: ["co"],
        onlyCountries: ["co"], // Solo permitir Colombia
        allowDropdown: false // Deshabilitar el dropdown de países
      });
    }

    return () => {
      if (itiRef.current) {
        itiRef.current.destroy();
      }
    };
  }, []);

  const validarTelefono = (numero) => {
    if (!numero) return null;
  
    // Convertir a string y eliminar todo lo que no sea número
    let numeroLimpio = numero.toString().replace(/\D/g, "");
  
    // Si ya tiene el prefijo 57, dejarlo como está
    if (numeroLimpio.startsWith("57")) {
      return numeroLimpio;
    }
  
    // Si es un número válido de Colombia (10 dígitos comenzando con 3)
    if (numeroLimpio.length === 10 && numeroLimpio.startsWith("3")) {
      // Agregar el prefijo 57
      return `57${numeroLimpio}`;
    }
  
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Obtener el número completo con el código de país
    const phoneNumber = itiRef.current
      ? itiRef.current.getNumber()
      : formData.phone;
    const validatedPhone = validarTelefono(phoneNumber);

    if (!validatedPhone) {
      setError("Por favor, ingresa un número de teléfono colombiano válido");
      setIsLoading(false);
      return;
    }

    try {
      const updatedFormData = {
        ...formData,
        phone: validatedPhone,
      };

      console.log('telefono a enviar', validatedPhone, "//", updatedFormData.phone)

      await login(updatedFormData.name, updatedFormData.phone);
      localStorage.setItem("userCity", formData.city);
      localStorage.setItem("userName", formData.name);
      navigate("/chat");

    } catch (error) {
      try {
        const response = await register(formData.name, validatedPhone);
        if (response) {
          navigate("/chat");
          return;
        }
      } catch (registerError) {
        console.error("Error en registro:", registerError);
        setError("Error en el registro. Verifica tus datos.");
      }

      if (error.response) {
        switch (error.response.status) {
          case 401:
            setError("Credenciales inválidas");
            break;
          case 404:
            setError("Usuario no encontrado");
            break;
          default:
            setError("Error al iniciar sesión. Intente nuevamente");
        }
      } else if (error.request) {
        setError("Error de conexión. Verifique su internet");
      } else {
        setError("Error al procesar la solicitud");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#1a1a2e] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md px-4 sm:px-6">
        <div className="w-full bg-[#2a2a3e] p-6 md:p-8 border border-[#6b5ffd] rounded-2xl 
                     shadow-[0_0_30px_-6px_#6b5ffd] text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#6b5ffd20] to-[#6b5ffd10] opacity-50"></div>

          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-24 sm:w-32 md:w-40 transition-transform duration-300 hover:scale-105">
                <img
                  src={campushm}
                  alt="Campus"
                  className="w-full h-auto mx-auto"
                />
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-white mb-8">
              ¡Bienvenido a Campuslands!
            </h1>

            {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-white text-left block text-sm">
                  Teléfono
                </Label>
                <div className="flex">
                  <input
                    type="tel"
                    name="phone"
                    ref={phoneInputRef}
                    required
                    className={phoneInputStyles.input}
                    placeholder="321 1234567"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white text-left block text-sm">
                  Nombre y Apellido
                </Label>
                <div className="relative group">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 
                               group-hover:text-[#6b5ffd] transition-colors duration-200"
                    size={18}
                  />
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

              <div className="space-y-2">
                <Label className="text-white text-left block text-sm">
                  Ciudad
                </Label>
                <div className="relative group">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 
                               group-hover:text-[#6b5ffd] transition-colors duration-200"
                    size={18}
                  />
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
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2.5 sm:py-3 px-4 rounded-lg text-sm 
                       cursor-pointer transition-all duration-300 
                       text-white transform hover:scale-[1.02]
                       active:scale-[0.98] hover:shadow-lg
                       ${isLoading 
                         ? "bg-[#4c3399] cursor-not-allowed" 
                         : "bg-[#6C3AFF] hover:bg-[#6d28d9]"}`}
              >
                {isLoading ? "Iniciando sesión..." : "Ingresar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;