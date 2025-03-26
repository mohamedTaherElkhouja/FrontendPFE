import { Categorie } from "./categorie"
import { user } from "./user"

export class pvDechet{
    _id!:String
    Date_Creation!:Date
    Id_User!:String
    Nature_Dechet!:String
    Type_Dechet!:String
    Designation!:String
    Num_lot!:Number
    
    Motif_Rejet!:String
    Commentaire!:String
}