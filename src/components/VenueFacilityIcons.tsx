
import React from "react";
import { 
  Wifi, 
  Lightbulb, 
  ShowerHead, 
  Car, 
  Coffee, 
  DumbbellIcon, 
  Shirt, 
  AirVent, 
  Utensils, 
  UmbrellaIcon,
  BadgeCheck,
  XCircle
} from "lucide-react";
import { Facility } from "@/types/supabase";

interface FacilityIconProps {
  facility: Facility;
  size?: number;
}

const FacilityIcon: React.FC<FacilityIconProps> = ({ facility, size = 16 }) => {
  const getIcon = () => {
    const name = facility.name.toLowerCase();
    
    if (name.includes('wifi')) return <Wifi size={size} />;
    if (name.includes('light') || name.includes('floodlight')) return <Lightbulb size={size} />;
    if (name.includes('shower') || name.includes('changing')) return <ShowerHead size={size} />;
    if (name.includes('parking')) return <Car size={size} />;
    if (name.includes('refreshment') || name.includes('coffee')) return <Coffee size={size} />;
    if (name.includes('equipment')) return <DumbbellIcon size={size} />;
    if (name.includes('uniform') || name.includes('kit')) return <Shirt size={size} />;
    if (name.includes('air') || name.includes('conditioning')) return <AirVent size={size} />;
    if (name.includes('food') || name.includes('canteen')) return <Utensils size={size} />;
    if (name.includes('shade') || name.includes('cover')) return <UmbrellaIcon size={size} />;
    if (name.includes('coach')) return <BadgeCheck size={size} />;
    
    // Default icon
    return <BadgeCheck size={size} />;
  };
  
  return (
    <div className={`flex items-center gap-2 ${facility.available ? 'text-gray-700' : 'text-gray-400'}`}>
      {facility.available ? getIcon() : <XCircle size={size} className="text-red-400" />}
      <span>{facility.name}</span>
    </div>
  );
};

interface FacilityListProps {
  facilities: Facility[];
  columns?: number;
}

const VenueFacilityIcons: React.FC<FacilityListProps> = ({ facilities, columns = 2 }) => {
  return (
    <div className={`grid grid-cols-${columns} gap-3`}>
      {facilities.map((facility, index) => (
        <FacilityIcon key={index} facility={facility} />
      ))}
    </div>
  );
};

export default VenueFacilityIcons;
