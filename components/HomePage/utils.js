export function getTrainingJson() {
    return (
        fetch('http://eugnot-solutions.atspace.cc/training.json')
        .then(res => res.json())
        .then(json => {
            return json
        })
    )
}