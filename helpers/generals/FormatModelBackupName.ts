const FormatModelBackupName = (model: string): string => {
    let name = model.toLowerCase() + 's'
    
    name = name + 's'
    name = name?.replace(' ', '-')
    name = name?.replace(/_/g, '-')

    if (!model.includes('design')) name = name?.replace('ss', 's')

    return name
}

export default FormatModelBackupName