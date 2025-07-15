import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';
import PlanSelectionDialog from './PlanSelectionDialog';

interface AddRestaurantDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (restaurant: any) => void;
}

const AddRestaurantDialog = ({ isOpen, onClose, onAdd }: AddRestaurantDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    handle: '',
    contactPerson: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: ''
  });
  const [showPlanSelection, setShowPlanSelection] = useState(false);

  // Sample data for countries, provinces, and cities
  const locationData = {
    'España': {
      'Madrid': ['Madrid', 'Alcalá de Henares', 'Móstoles', 'Fuenlabrada', 'Leganés', 'Getafe'],
      'Cataluña': ['Barcelona', 'Hospitalet de Llobregat', 'Badalona', 'Terrassa', 'Sabadell', 'Lleida'],
      'Valencia': ['Valencia', 'Alicante', 'Elche', 'Castellón de la Plana', 'Torrevieja', 'Orihuela'],
      'Andalucía': ['Sevilla', 'Málaga', 'Córdoba', 'Granada', 'Jerez de la Frontera', 'Almería'],
      'País Vasco': ['Bilbao', 'Vitoria-Gasteiz', 'San Sebastián', 'Barakaldo', 'Getxo', 'Irun'],
      'Galicia': ['Vigo', 'A Coruña', 'Ourense', 'Lugo', 'Santiago de Compostela', 'Pontevedra']
    },
    'México': {
      'Ciudad de México': ['Ciudad de México', 'Ecatepec', 'Nezahualcóyotl', 'Naucalpan', 'Tlalnepantla'],
      'Jalisco': ['Guadalajara', 'Zapopan', 'Tlaquepaque', 'Tonalá', 'Puerto Vallarta', 'Tlajomulco'],
      'Nuevo León': ['Monterrey', 'Guadalupe', 'San Nicolás de los Garza', 'Apodaca', 'General Escobedo'],
      'Puebla': ['Puebla', 'Tehuacán', 'San Martín Texmelucan', 'Atlixco', 'San Pedro Cholula'],
      'Veracruz': ['Veracruz', 'Xalapa', 'Coatzacoalcos', 'Córdoba', 'Poza Rica', 'Minatitlán']
    },
    'Argentina': {
      'Buenos Aires': ['Buenos Aires', 'La Plata', 'Mar del Plata', 'Bahía Blanca', 'Tandil', 'Olavarría'],
      'Córdoba': ['Córdoba', 'Villa María', 'Río Cuarto', 'San Francisco', 'Villa Carlos Paz'],
      'Santa Fe': ['Rosario', 'Santa Fe', 'Rafaela', 'Venado Tuerto', 'Reconquista'],
      'Mendoza': ['Mendoza', 'San Rafael', 'Godoy Cruz', 'Maipú', 'Luján de Cuyo']
    },
    'Colombia': {
      'Bogotá D.C.': ['Bogotá', 'Soacha', 'Chía', 'Zipaquirá', 'Facatativá'],
      'Antioquia': ['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Apartadó', 'Turbo'],
      'Valle del Cauca': ['Cali', 'Palmira', 'Buenaventura', 'Tulua', 'Cartago'],
      'Atlántico': ['Barranquilla', 'Soledad', 'Malambo', 'Sabanagrande', 'Galapa']
    },
    'Chile': {
      'Región Metropolitana': ['Santiago', 'Puente Alto', 'Maipú', 'Las Condes', 'La Florida', 'Ñuñoa'],
      'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Villa Alemana', 'Quilpué', 'San Antonio'],
      'Biobío': ['Concepción', 'Talcahuano', 'Chillán', 'Los Ángeles', 'Coronel']
    },
    'Perú': {
      'Lima': ['Lima', 'Callao', 'San Juan de Lurigancho', 'San Martín de Porres', 'Ate'],
      'Arequipa': ['Arequipa', 'Cayma', 'Cerro Colorado', 'Paucarpata', 'Mariano Melgar'],
      'La Libertad': ['Trujillo', 'El Porvenir', 'Florencia de Mora', 'La Esperanza', 'Víctor Larco']
    },
    'Estados Unidos': {
      'California': ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento', 'Fresno', 'Long Beach'],
      'Texas': ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth', 'El Paso'],
      'Florida': ['Miami', 'Tampa', 'Orlando', 'Jacksonville', 'Fort Lauderdale', 'Tallahassee'],
      'New York': ['New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse', 'Albany']
    },
    'Brasil': {
      'São Paulo': ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André'],
      'Rio de Janeiro': ['Rio de Janeiro', 'Nova Iguaçu', 'Duque de Caxias', 'Niterói', 'São Gonçalo'],
      'Minas Gerais': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim'],
      'Bahia': ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Juazeiro']
    }
  };

  const countries = Object.keys(locationData);
  const provinces = formData.country ? Object.keys(locationData[formData.country as keyof typeof locationData] || {}) : [];
  const cities = formData.country && formData.province ? 
    locationData[formData.country as keyof typeof locationData]?.[formData.province as keyof typeof locationData[keyof typeof locationData]] || [] : [];

  const handleCountryChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      country: value,
      province: '', // Reset province when country changes
      city: '' // Reset city when country changes
    }));
  };

  const handleProvinceChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      province: value,
      city: '' // Reset city when province changes
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: Date.now().toString(),
      ...formData,
      location: `${formData.city}, ${formData.country}`,
      image: '/lovable-uploads/26ce4d51-7cef-481d-8b86-af6c758c3760.png'
    });
    
    setShowPlanSelection(true);
  };

  const handlePlanSelectionClose = () => {
    setShowPlanSelection(false);
    setFormData({ 
      name: '', 
      handle: '', 
      contactPerson: '',
      address: '',
      city: '',
      province: '',
      postalCode: '',
      country: ''
    });
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen && !showPlanSelection} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Agregar nuevo restaurante</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">
                Nombre del restaurante <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="McDonald's Centro"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="handle">
                Usuario de Instagram <span className="text-red-500">*</span>
              </Label>
              <Input
                id="handle"
                value={formData.handle}
                onChange={(e) => setFormData(prev => ({ ...prev, handle: e.target.value }))}
                placeholder="mcdonalds_centro"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="contactPerson">
                Persona de contacto <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                placeholder="María García"
                required
              />
            </div>
            
            <div>
              <Label className="text-base font-medium">Dirección del restaurante</Label>
            </div>
            
            <div>
              <Label htmlFor="country">
                País <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.country} onValueChange={handleCountryChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un país" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="province">
                  Provincia <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.province} 
                  onValueChange={handleProvinceChange} 
                  disabled={!formData.country}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="city">
                  Ciudad <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.city} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, city: value }))}
                  disabled={!formData.province}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="address">
                Calle y número <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Calle Gran Vía, 28"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="postalCode">
                Código postal <span className="text-red-500">*</span>
              </Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                placeholder="28013"
                required
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                Continuar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <PlanSelectionDialog
        isOpen={showPlanSelection}
        onClose={handlePlanSelectionClose}
        restaurantName={formData.name}
      />
    </>
  );
};

export default AddRestaurantDialog;
