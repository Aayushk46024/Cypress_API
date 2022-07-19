/// <reference types="Cypress" />
const dataJson = require('../../fixtures/createuser')

describe('post user request', () => {
    let accessToken = '2a081417c2d923e162c3983f113721646eb672f2de1ba42c49aff4a269539859'
    let randomText = ""
    let testEmail = ""


    it.only('create user test', () => {
        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for (var i = 0; i < 10; i++)
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length));
        testEmail = randomText + '@gmail.com'

        //1. create user (POST)
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v1/users',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            body: {
                "name": "Test Automation Cypress",
                "gender": "male",
                "email": "aayush@gmail.com",
                "status": "active"
            }

        }).then((res) => {
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)
            expect(res.body.data).has.property('email', 'aayush@gmail.com')
            expect(res.body.data).has.property('name', 'Test Automation Cypress')
            expect(res.body.data).has.property('status', 'active')
            expect(res.body.data).has.property('gender', 'male')
        }).then((res) => {
            const userId = res.body.data.id
            cy.log("user id is: " + userId)
            //2. update user (PUT)
            cy.request({
                method: 'PUT',
                url: 'https://gorest.co.in/public/v1/users/' + userId,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                body: {
                    "name": "Test Automation Cypress Updated",
                    "gender": "male",
                    "email": "aayushk@gmail.com",
                    "status": "inactive"
                }
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body.data).has.property('email', 'aayushk@gmail.com')
                expect(res.body.data).has.property('name', 'Test Automation Cypress Updated')
                expect(res.body.data).has.property('status', 'inactive')
                expect(res.body.data).has.property('gender', 'male')
            })
        })



    })
})