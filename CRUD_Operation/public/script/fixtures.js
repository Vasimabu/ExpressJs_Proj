/* document.addEventListener('DOMContentLoaded', () => {
    fetch('https://staging.cricket-21.com/cricketapi/api/matchcenter/fixtures?compid=1948&type=json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            //console.log(response.json());
            return response.json();
        })
        .then(data => {
            console.log(data)
            const fixturesList = document.getElementById('fixtures-list');
            fixturesList.innerHTML = ''; // Clear any existing content

            // Ensure data.fixtures exists and is an array
            const fixtures = data.fixtures || [];

            fixtures.forEach(fixture => {
                const listItem = document.createElement('li');
                listItem.textContent = `Match: ${fixture.matchName || 'N/A'}, Date: ${fixture.date || 'N/A'}`;
                fixturesList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching fixtures:', error));
});
 */

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://staging.cricket-21.com/cricketapi/api/matchcenter/fixtures?compid=1948&type=json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data);
            const fixturesList = document.getElementById('fixtures-list');
            fixturesList.innerHTML = ''; // Clear any existing content

            // Check if data.fixtures is an array and process it
            const fixtures = Array.isArray(data.fixtures) ? data.fixtures : [];

            fixtures.forEach(fixture => {
                const listItem = document.createElement('li');
                // Adjust property names based on actual API response
                listItem.textContent = `Match: ${fixture.name || 'N/A'}, Date: ${fixture.date || 'N/A'}`;
                fixturesList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching fixtures:', error));
});

