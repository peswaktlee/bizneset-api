const FormatBusinessTitle = (title: string): string => {
    let newTitle = title

    if (newTitle.length > 82) {
        newTitle = newTitle.substring(0, 82)
        newTitle = newTitle + '...'
    }

    return newTitle
}

export default FormatBusinessTitle