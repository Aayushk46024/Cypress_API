describe('check weather informaiton', ()=>{
    let API_key = 'ce02bb47dc1e65ee76f070cd86f4835e'

    it('get weather ifnormation for cities', ()=>{
        //1st request: GET locations 
        cy.request({
              method: 'GET',
              url: 'https://api.openweathermap.org/data/2.5/weather?q=London&appid={API key}',
              headers: {
                'API key': API_key
            },
            body: {
                "name": payload.name,
                "gender": payload.gender,
                "email": testEmail,
                "status": payload.status
            }
           
        }).then((resp)=>{
            const city = resp.body[0].title
            return city
        })
            .then((city)=>{
                //2nd request for the first location/city
                cy.request({
                    method: 'GET',
                    url: 'https://www.metaweather.com/api/location/search/?query='+city
                }).then((resp)=>{
                    expect(resp.status).to.eq(200)
                    expect(resp.body[0]).to.have.property('title', city)
                })

            })

    })


    it.only('get weather information for all cities', ()=>{
        //1st request: GET locations 
        cy.request({
              method: 'GET',
              url: 'https://www.metaweather.com/api/location/search/?query=San'
           
        }).then((resp)=>{
            const location = resp.body
            return location
        })
            .then((location)=>{

                for(let i=0; i< location.length; i++){
                //2nd request for the first location/city
                cy.request({
                    method: 'GET',
                    url: 'https://www.metaweather.com/api/location/search/?query='+location[i].title
                }).then((resp)=>{
                    expect(resp.status).to.eq(200)
                    expect(resp.body[0]).to.have.property('title', location[i].title)
                })

            }

            })
    })

})