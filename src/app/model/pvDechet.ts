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
    AQ_Validated!:Boolean
    AQ_Quantite_Avant!:Number
    AQ_Quantite_Apres!:Number
    AQ_Commentaire!:String
    AQ_Validated_Date!:Date
    HSE_Validated!:Boolean
    HSE_Commentaire!:String
    
}