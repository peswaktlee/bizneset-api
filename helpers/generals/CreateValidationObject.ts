import type { ValidationReturnType } from '@/ts'

const CreateValidationObject = (): ValidationReturnType => {
    return {
        error: false,
        message: ''
    }
}

export default CreateValidationObject