import type { ImageFileInstance, ValidationReturnType } from '@/ts'
import { CreateValidationObject, Translation } from '@/helpers/generals'

export const GalleryValidation = (gallery: Array<ImageFileInstance> | undefined): ValidationReturnType => {
    const validation = CreateValidationObject()

    try {
        let includesValidImage = false
        
        if (gallery) gallery.forEach((image: ImageFileInstance) => {
            const media = image.Media
            const isFile = media instanceof File

            if (isFile) includesValidImage = true
        })

        if (!includesValidImage) {
            validation.message = Translation('gallery-error')
            validation.error = true
        }
    }

    catch (_) {
        validation.message = Translation('gallery-error')
        validation.error = true
    }

    return validation
}

export default GalleryValidation