@startuml
class ParkingLotSystem{
    +ParkingStrategy parkingStrategy
    +ParkingLotSystem instance
    +List<ParkingFloor> floors
    +Map<String, ParkingTicket> activeTickets
    +FeeStrategy feeStrategy
    
    +void addFloor(ParkingFloor)
    +Optional<ParkingTicket> parkVehicle(Vehicle)
    +void setFeeStrategy(FeeStrategy)
    +void setParkingStrategy(ParkingStrategy)
    +Optional<Double> unparkVehicle(String)
    +ParkingLotSystem getInstance()
}
class ParkingLotDemo{
    +main(String)
}
ParkingLotDemo->ParkingLotSystem
interface ParkingStrategy{
    +Optional<ParkingSpot> findSpot(List<ParkingFloor>, Vehicle)
}
class NearestFirstStrategy implements ParkingStrategy{
    
}
class BestFitStrategy implements ParkingStrategy{

}
class FarthestFirstStrategy implements ParkingStrategy{

}
ParkingLotSystem -> ParkingStrategy
interface FeeStrategy{
    +double calculateFee(ParkingTicket)
}
class VehicleBasedFeeStrategy implements FeeStrategy{
    +Map<VehicleSize, Double> HOURLY_RATES;
    +double calculateFee(ParkingTicket)
}
class FlatRateFeeStrategy implements FeeStrategy{
    +double RATE_PER_HOUR;
    +double calculateFee(ParkingTicket)
}
ParkingLotSystem -> FeeStrategy
class ParkingFloor{
    +int floorNumber;
    +Map<String, ParkingSpot> spots;
    +Optional<ParkingSpot> findAvailableSpot(Vehicle)
}
class ParkingTicket{
    +ParkingSpot spot
    +String ticketId
    +long entryTimeStamp
    +long exitTimeStamp
    +Vehicle vehicle
}
ParkingLotSystem -> ParkingTicket
ParkingLotSystem -> ParkingFloor
class ParkingSpot{
    +VehicleSize spotSize
    +String spotId
    +boolean isOccupied
    +Vehicle parkedVehicle
    +boolean canFitVehicle(Vehicle)
    +void parkVehicle(Vehicle)
    +void unparkVehicle()
    +boolean isAvailable()
}
ParkingFloor -> ParkingSpot
abstract class Vehicle{
    +VehicleSize size
    +String licenseNumber
}
class Bike extends Vehicle{

}
class Truck extends Vehicle{

}
Enum VehicleSize{
    +SMALL
    +MEDIUM
    +LARGE
}
Vehicle -> VehicleSize
VehicleBasedFeeStrategy -> VehicleSize
@enduml