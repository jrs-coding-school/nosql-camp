const h = hyperscript

document.querySelector('form')
    .addEventListener('submit', function(e) {
        e.preventDefault()
        var q = document.getElementsByName('q')[0].value
        search(q, function(err, data) {
            if (err) return alert('no movies for you!')
            if (!data.Error) {
                render(data.Search)
            } else {
                alert('No Movies Found!')
            }
        })
    })

function(movie) {

    return h('div', [

    ])

}

function render(movies) {
    function movie(m) {
        return h('div.cf.mv3', [
            h('img.h4.fl', {
                src: m.Poster
            }),
            h('h1.ml3.fl', m.Title),
            h('p.ml3.fl', m.Year)
        ])
    }
    document.getElementById('results')
        .replaceChild(
            h('div#movies', [
                h('h1', 'Movie Results'),
                movies.map(movie)
            ]), document.getElementById('movies'))
}
