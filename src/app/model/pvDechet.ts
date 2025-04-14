import { Categorie } from "./categorie"
import { user } from "./user"

export class pvDechet{
    _id!:String
    Date_Creation!:Date
    Id_User!:String
    Nature_Dechet!:String
    Type_Dechet!:Number 
    Service_Emetteur!:String
    Designation!:String
    Num_lot!:Number
    Quantite!:Number
    Motif_Rejet!:String
    Commentaire!:String
    statut!:String
    
}