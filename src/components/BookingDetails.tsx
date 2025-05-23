
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, DollarSign, ClipboardList } from 'lucide-react';
import { Booking } from '@/types/supabase';

interface BookingDetailsProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onCancel?: (id: string) => void;
  onConfirm?: (id: string) => void;
  onReject?: (id: string) => void;
  showAdminActions?: boolean;
}

export const BookingDetails: React.FC<BookingDetailsProps> = ({
  booking,
  isOpen,
  onClose,
  onCancel,
  onConfirm,
  onReject,
  showAdminActions = false
}) => {
  if (!booking) return null;

  const statusColor = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const handleCancel = () => {
    onCancel && booking && onCancel(booking.id);
    onClose();
  };

  const handleConfirm = () => {
    onConfirm && booking && onConfirm(booking.id);
    onClose();
  };

  const handleReject = () => {
    onReject && booking && onReject(booking.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Booking Details</DialogTitle>
          <DialogDescription>
            Booking ID: <span className="font-mono">{booking.id.substring(0, 8)}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-6">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                statusColor[booking.status as keyof typeof statusColor] || 'bg-gray-100 text-gray-800'
              }`}
            >
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-sport-purple mt-0.5" />
              <div>
                <p className="font-semibold">{booking.venue?.name || 'Venue'}</p>
                <p className="text-sm text-gray-600">{booking.venue?.address || 'Address unavailable'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-sport-purple" />
              <div>
                <p className="font-semibold">Date</p>
                <p className="text-sm text-gray-600">
                  {new Date(booking.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-sport-purple" />
              <div>
                <p className="font-semibold">Time Slot</p>
                <p className="text-sm text-gray-600">{booking.time_slot}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-sport-purple" />
              <div>
                <p className="font-semibold">Amount</p>
                <p className="text-sm text-gray-600">{booking.amount}</p>
              </div>
            </div>
            
            {booking.notes && (
              <div className="flex items-start gap-3">
                <ClipboardList className="w-5 h-5 text-sport-purple mt-0.5" />
                <div>
                  <p className="font-semibold">Notes</p>
                  <p className="text-sm text-gray-600">{booking.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-4">
          {booking.status !== 'cancelled' && booking.status !== 'completed' && !showAdminActions && (
            <Button onClick={handleCancel} variant="destructive">
              Cancel Booking
            </Button>
          )}
          
          {showAdminActions && booking.status === 'pending' && (
            <>
              <Button onClick={handleReject} variant="destructive">
                Reject
              </Button>
              <Button onClick={handleConfirm} className="bg-green-600 hover:bg-green-700">
                Confirm
              </Button>
            </>
          )}
          
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetails;
