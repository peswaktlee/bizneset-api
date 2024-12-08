import { Firebase } from '@/helpers/libs/firebase'
import { Console } from '@/helpers/logs'

const DeleteFirebaseAccount = async (uid: string): Promise<boolean> => {
    try {
        const admin = await Firebase()
        await admin.auth().deleteUser(uid)

        return true
    } 
    
    catch (error) {
        Console.Error('DeleteFirebaseAccount', error)
        return false
    }
}

export default DeleteFirebaseAccount