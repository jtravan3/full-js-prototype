const https = require('https');
/*
 * Complete the function below.
 * Use console.log to print the result, you should not return from the function.
 */
function getMovieTitles(substr) {

    getMoviesByPageNumber(substr, 1).then(output => {

        let movieTitles = [];

        movieTitles = movieTitles
            .concat(output.data
                .map(entry => entry.Title));

        if(output.total_pages == 1) {
            movieTitles.sort().forEach(title => console.log(title));
        } else {
            for(let i = 2; i <= output.total_pages; i++) {
                getMoviesByPageNumber(substr, i).then(output => {
                    movieTitles = movieTitles
                        .concat(output.data
                            .map(entry => entry.Title));
                });
            }

            movieTitles.sort().forEach(title => console.log(title));
        }
    });
}

const getMoviesByPageNumber = (substr, pageNumber) => {

    return new Promise((resolve, reject) => {
        https.get('https://jsonmock.hackerrank.com/api/movies/search/?Title=' + substr + '&page=' + pageNumber, resp => {
            let data = '';

            resp.on('data', chunk => {
                data += chunk;
            });

            resp.on('end', () => {
                return resolve(JSON.parse(data));
            });

            resp.on('error', (error) => {
                return reject(error);
            });
        });
    });

};



getMovieTitles('waterworld');