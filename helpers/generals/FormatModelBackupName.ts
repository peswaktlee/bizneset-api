const FormatModelBackupName = (model: string): string => {
    let name = model.toLowerCase() + 's'
    
    name = name + 's'
    name = name?.replace(' ', '-')
    name = name?.replace(/_/g, '-')

    return name
}

export default FormatModelBackupName