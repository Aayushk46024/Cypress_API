/// <reference types="Cypress" />
const dataJson = require('../../fixtures/example')
describe('api test cases',() => {
    var payload = ""
    let accesstoken= '2a081417c2d923e162c3983f113721646eb672f2de1ba42c49aff4a269539859'
    it('get user', () => {        
        cy.request({
            method : 'GET',
            url : 'https://gorest.co.in/public-api/users/123/posts',
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
              }
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.meta.pagination).has.property('limit',20)
            expect(res.body).has.to.deep.equal({
                "code": 200,
                "meta": {
                    "pagination": {
                        "total": 0,
                        "pages": 0,
                        "page": 1,
                        "limit": 20
                    }
                },
                "data": []
                })
        })
    })

    it('get user by id', () => {
        cy.request({
            method : 'GET',
            url : 'https://gorest.co.in/public-api/users/3883',
            headers: {
                'authorization': 'Bearer '+accesstoken,
              }
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.data.name).to.eq('Akroor Mishra')
        })    
    })  
})