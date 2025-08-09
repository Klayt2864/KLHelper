import React, { useState } from 'react';
import { HelpCircle, Bot, Send, Lock, Phone, DollarSign } from 'lucide-react';

interface TheoreticalHelpSectionProps {
  theme: 'dark' | 'light';
  cardClasses: string;
}

export default function TheoreticalHelpSection({ theme, cardClasses }: TheoreticalHelpSectionProps) {
  const [accessCode, setAccessCode] = useState('');
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState<Array<{id: number, type: 'user' | 'bot', message: string}>>([]);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === 'KL_a.') {
      setIsCodeValid(true);
      setConversation([
        {
          id: 1,
          type: 'bot',
          message: '¡Hola! Soy KL_01, tu asistente especializado en ayuda teórica y técnica. Estoy aquí para proporcionarte información detallada y completa sobre:\n\n🔧 **Electrónica y Circuitos**\n💻 **Programación y Software**\n⚡ **Sistemas Eléctricos**\n🛠️ **Tecnología y Hardware**\n📊 **Análisis Técnico**\n\n¿En qué tema específico te gustaría que profundice? Puedo proporcionarte explicaciones detalladas, ejemplos prácticos, fórmulas, diagramas conceptuales y mucho más.'
        }
      ]);
    }
  };

  const generateDetailedResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Detectar si pide más información
    const askingForMore = lowerQuestion.includes('más información') || 
                         lowerQuestion.includes('más detalles') || 
                         lowerQuestion.includes('profundiza') ||
                         lowerQuestion.includes('explica mejor') ||
                         lowerQuestion.includes('amplía') ||
                         lowerQuestion.includes('detalla');

    // Respuestas detalladas por categorías
    if (lowerQuestion.includes('resistencia') || lowerQuestion.includes('resistor')) {
      return `## 🔧 Resistencias Eléctricas - Información Completa

### **Definición y Función**
Una resistencia es un componente electrónico pasivo que limita el flujo de corriente eléctrica en un circuito. Su función principal es controlar la cantidad de corriente que pasa a través de ella.

### **Ley de Ohm**
**V = I × R**
- V = Voltaje (Voltios)
- I = Corriente (Amperios) 
- R = Resistencia (Ohmios)

### **Tipos de Resistencias**
1. **Fijas**: Valor constante (carbón, película metálica)
2. **Variables**: Potenciómetros, reóstatos
3. **Especiales**: Termistores, fotoresistores

### **Código de Colores**
- **Negro**: 0
- **Marrón**: 1
- **Rojo**: 2
- **Naranja**: 3
- **Amarillo**: 4
- **Verde**: 5
- **Azul**: 6
- **Violeta**: 7
- **Gris**: 8
- **Blanco**: 9

### **Aplicaciones Prácticas**
- Limitación de corriente en LEDs
- Divisores de voltaje
- Filtros de frecuencia
- Circuitos de polarización

¿Te gustaría que profundice en algún aspecto específico como cálculos, aplicaciones o tipos especiales?`;
    }

    if (lowerQuestion.includes('capacitor') || lowerQuestion.includes('condensador')) {
      return `## ⚡ Capacitores - Guía Técnica Completa

### **Principio de Funcionamiento**
Un capacitor almacena energía eléctrica en un campo eléctrico entre dos placas conductoras separadas por un material dieléctrico.

### **Fórmulas Fundamentales**
- **Capacitancia**: C = Q/V (Faradios)
- **Energía almacenada**: E = ½CV²
- **Reactancia capacitiva**: Xc = 1/(2πfC)

### **Tipos de Capacitores**
1. **Electrolíticos**: Alta capacitancia, polarizados
2. **Cerámicos**: Estables, no polarizados
3. **Tantalio**: Compactos, confiables
4. **Film**: Precisión, baja pérdida
5. **Variables**: Ajustables (trimmer, air gap)

### **Aplicaciones Técnicas**
- **Filtrado**: Suavizar ondulaciones en fuentes
- **Acoplamiento**: Transferir señales AC
- **Desacoplamiento**: Eliminar ruido
- **Temporización**: Circuitos RC
- **Arranque de motores**: Motores monofásicos

### **Parámetros Importantes**
- **ESR** (Resistencia Serie Equivalente)
- **Voltaje de trabajo**
- **Temperatura de operación**
- **Tolerancia**

¿Necesitas información sobre cálculos específicos, selección para aplicaciones o análisis de circuitos?`;
    }

    if (lowerQuestion.includes('transistor') || lowerQuestion.includes('bjt') || lowerQuestion.includes('fet')) {
      return `## 🔬 Transistores - Análisis Técnico Detallado

### **Tipos Principales**

#### **BJT (Transistor Bipolar)**
- **NPN**: Corriente fluye de colector a emisor
- **PNP**: Corriente fluye de emisor a colector
- **Ganancia**: β = Ic/Ib (típicamente 50-300)

#### **FET (Transistor de Efecto de Campo)**
- **JFET**: Controlado por voltaje gate-source
- **MOSFET**: Mayor impedancia de entrada
- **Enhancement/Depletion mode**

### **Configuraciones de Amplificación**
1. **Emisor Común**: Alta ganancia de voltaje
2. **Colector Común**: Seguidor de voltaje
3. **Base Común**: Alta ganancia de corriente

### **Parámetros Clave**
- **Vbe**: ~0.7V para silicio
- **Vce(sat)**: ~0.2V en saturación
- **Ic(max)**: Corriente máxima de colector
- **Pd(max)**: Potencia máxima disipable

### **Aplicaciones Avanzadas**
- **Amplificadores**: Audio, RF, operacionales
- **Conmutación**: Digital, PWM, drivers
- **Osciladores**: Cristal, RC, LC
- **Reguladores**: Voltaje, corriente

### **Análisis de Circuitos**
- **Punto Q**: Polarización DC
- **Modelo de pequeña señal**: Análisis AC
- **Estabilidad térmica**

¿Te interesa profundizar en diseño de amplificadores, análisis de polarización o aplicaciones específicas?`;
    }

    if (lowerQuestion.includes('arduino') || lowerQuestion.includes('microcontrolador')) {
      return `## 💻 Arduino y Microcontroladores - Guía Completa

### **Arduino - Plataforma de Desarrollo**
Arduino es una plataforma de hardware y software libre basada en microcontroladores AVR de Atmel (ahora Microchip).

### **Modelos Principales**
- **Arduino Uno**: ATmega328P, 14 I/O digitales, 6 analógicas
- **Arduino Nano**: Compacto, mismo chip que Uno
- **Arduino Mega**: ATmega2560, 54 I/O digitales
- **Arduino Leonardo**: ATmega32u4, USB nativo

### **Programación**
  ``\`cpp
// Estructura básica
void setup() {
  // Configuración inicial
  pinMode(13, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // Código principal repetitivo
  digitalWrite(13, HIGH);
  delay(1000);
}


### **Funciones Principales**
- **digitalWrite()**: Control de salidas digitales
- **digitalRead()**: Lectura de entradas digitales
- **analogRead()**: Lectura ADC (0-1023)
- **analogWrite()**: PWM (0-255)
- **Serial**: Comunicación UART

### **Comunicación**
- **I2C**: Wire library, múltiples dispositivos
- **SPI**: Comunicación serie síncrona
- **UART**: Serial asíncrona
- **Wireless**: WiFi, Bluetooth, LoRa

### **Proyectos Avanzados**
- **IoT**: Sensores conectados a internet
- **Robótica**: Control de motores y sensores
- **Domótica**: Automatización del hogar
- **Instrumentación**: Medición y control

¿Quieres información sobre programación específica, proyectos prácticos o integración con sensores?`;
    }

    if (lowerQuestion.includes('led') || lowerQuestion.includes('diodo')) {
      return `## 💡 LEDs y Diodos - Información Técnica Completa

### **Principio de Funcionamiento**
Los LEDs (Light Emitting Diodes) son diodos semiconductores que emiten luz cuando la corriente fluye en dirección directa.

### **Características Eléctricas**
- **Voltaje directo (Vf)**:
  - Rojo: ~2.0V
  - Verde: ~2.2V
  - Azul/Blanco: ~3.2V
  - IR: ~1.2V
- **Corriente típica**: 20mA (máximo seguro)
- **Corriente máxima**: Varía según modelo

### **Cálculo de Resistencia Limitadora**
**R = (Vs - Vf) / If**
- Vs = Voltaje de alimentación
- Vf = Voltaje directo del LED
- If = Corriente deseada

**Ejemplo**: LED rojo con 5V
R = (5V - 2V) / 0.02A = 150Ω

### **Tipos de LEDs**
1. **Estándar**: 3mm, 5mm, colores básicos
2. **Alta potencia**: 1W, 3W, 5W+
3. **SMD**: Montaje superficial (0603, 0805, 1206)
4. **RGB**: Tres colores en uno
5. **Direccionales**: Ángulo de haz específico

### **Aplicaciones Técnicas**
- **Indicadores**: Estado de sistemas
- **Iluminación**: Eficiencia energética
- **Displays**: 7 segmentos, matrices
- **Comunicación**: Fibra óptica, IR
- **Sensores**: Optoacopladores

### **Consideraciones de Diseño**
- **Disipación térmica**: Importante en alta potencia
- **Driver de corriente**: Para LEDs de potencia
- **Control de brillo**: PWM vs control analógico
- **Vida útil**: Típicamente 50,000+ horas

¿Te gustaría información sobre drivers de LED, control de matrices o aplicaciones específicas?`;
    }

    // Respuesta general mejorada
    return `## 🔍 Análisis Técnico Detallado

He analizado tu consulta sobre **"${question}"** y puedo proporcionarte información completa sobre este tema.

### **Información General**
Este concepto se relaciona con principios fundamentales en el campo de la electrónica y tecnología. Basándome en mi base de conocimientos técnicos, puedo decirte que:

### **Aspectos Técnicos Relevantes**
- **Principios fundamentales**: Los conceptos básicos que rigen este tema
- **Aplicaciones prácticas**: Cómo se implementa en proyectos reales
- **Consideraciones de diseño**: Factores importantes a tener en cuenta
- **Parámetros críticos**: Valores y especificaciones clave

### **Análisis Detallado**
Para proporcionarte la información más precisa y útil, este tema abarca múltiples aspectos que incluyen teoría, práctica y aplicaciones específicas en el campo de la electrónica.

### **Información Adicional Disponible**
Puedo profundizar en:
- 📊 **Cálculos y fórmulas específicas**
- 🔧 **Implementación práctica**
- 📈 **Análisis de parámetros**
- 🛠️ **Herramientas y componentes**
- 📚 **Referencias técnicas**

**¿Te gustaría que profundice en algún aspecto específico?** Puedes preguntarme sobre:
- Cálculos matemáticos
- Implementación práctica
- Componentes necesarios
- Aplicaciones específicas
- Troubleshooting

Solo dime "más información sobre [aspecto específico]" y te proporcionaré un análisis técnico detallado.`;
  };
  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    const newUserMessage = {
      id: conversation.length + 1,
      type: 'user' as const,
      message: question
    };
    
    setConversation(prev => [...prev, newUserMessage]);

    const currentQuestion = question;
    setQuestion('');

    // Respuesta mejorada del asistente IA
    setTimeout(() => {
      const response = {
        id: conversation.length + 2,
        type: 'bot' as const,
        message: generateDetailedResponse(currentQuestion)
      };
      
      setConversation(prev => [...prev, response]);
      setLoading(false);
    }, 1500);
  };

  const inputClasses = theme === 'dark' 
    ? 'bg-purple-900/30 border-purple-600 text-white placeholder-purple-300'
    : 'bg-green-700/20 border-green-500 text-white placeholder-green-200';

  if (!isCodeValid) {
    return (
      <div className="space-y-6">
        <div className={`${cardClasses} border rounded-xl p-6`}>
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="text-blue-500" size={32} />
            <div>
              <h2 className="text-2xl font-bold">Ayuda Teórica</h2>
              <p className="text-sm opacity-70">Asistente IA KL_01</p>
            </div>
          </div>

          <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-100 border-yellow-300'} border`}>
            <div className="flex items-center gap-2 mb-3">
              <Lock className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-yellow-500">Acceso Restringido</h3>
            </div>
            <p className="text-sm mb-4">
              Para usar esta sección necesitas un código de acceso. Contacta al controlador 
              para obtenerlo mediante el número de la tarjeta de recomendación.
            </p>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-blue-500" />
              <span className="text-sm">Contacta al controlador para obtener el código</span>
            </div>
          </div>

          <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'} border border-blue-300`}>
            <div className="flex items-center justify-between">
              <span className="font-medium">Costo de acceso:</span>
              <div className="flex items-center gap-1 text-green-500 font-bold">
                <DollarSign size={16} />
                <span>2.00</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Código de Acceso</label>
              <input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${inputClasses} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                placeholder="Ingresa tu código de acceso"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200"
            >
              Verificar Código
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className={`${cardClasses} border rounded-xl p-6`}>
        <div className="flex items-center gap-3 mb-6">
          <Bot className="text-blue-500" size={32} />
          <div>
            <h2 className="text-2xl font-bold">KL_01 Asistente IA</h2>
            <p className="text-sm opacity-70">Ayuda teórica especializada</p>
          </div>
        </div>

        <div className="space-y-4 mb-6 h-96 overflow-y-auto pr-2">
          {conversation.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-xl ${
                msg.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : theme === 'dark' 
                    ? 'bg-purple-800/50 border border-purple-600' 
                    : 'bg-gray-100 border border-gray-300'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {msg.type === 'bot' && <Bot size={16} className="text-blue-500" />}
                  <span className="text-sm font-medium">
                    {msg.type === 'user' ? 'Tú' : 'KL_01'}
                  </span>
                </div>
                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                  {msg.message.split('\n').map((line, index) => {
                    if (line.startsWith('##')) {
                      return <h3 key={index} className="text-lg font-bold mt-4 mb-2 text-blue-600">{line.replace('##', '').trim()}</h3>;
                    }
                    if (line.startsWith('###')) {
                      return <h4 key={index} className="text-md font-semibold mt-3 mb-1 text-blue-500">{line.replace('###', '').trim()}</h4>;
                    }
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return <p key={index} className="font-semibold mt-2">{line.replace(/\*\*/g, '')}</p>;
                    }
                    if (line.startsWith('- ')) {
                      return <li key={index} className="ml-4 mt-1">{line.substring(2)}</li>;
                    }
                    if (line.trim() === '') {
                      return <br key={index} />;
                    }
                    return <p key={index} className="mt-1">{line}</p>;
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-purple-800/50 border border-purple-600' : 'bg-gray-100 border border-gray-300'}`}>
                <div className="flex items-center gap-2">
                  <Bot size={16} className="text-blue-500" />
                  <span className="text-sm">KL_01 está analizando y preparando respuesta detallada...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleQuestionSubmit} className="flex gap-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className={`flex-1 px-4 py-3 rounded-lg border ${inputClasses} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
            placeholder="Pregunta sobre electrónica, programación, circuitos..."
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}