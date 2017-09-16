describe("Unit Testing Cases", function () {
    //====making this for set interval functionalit
     before(function () {
        if (window.__html__) {
            document.body.innerHTML = window.__html__['test/qa.welcome.html'];
        }
        setUtmParams("68ba126472fa2d9a8bb75a848dbd29cd");
        window.site_q = '';
    });
    after(function () {
        fixture.cleanup();
    });
    beforeEach(function () {
        this.clock = sinon.useFakeTimers();
    });

    afterEach(function () {
        this.clock = sinon.restore();
    });

    this.timeout(15000000)
    describe("Test 1 Validate Functionality for form New User Form", function () {
        it('Test 1 Case When Only First Name is there and removed', function () {
            $("#new_user #user_first_name").val("archit")
            $("#new_user #user_first_name").blur();
            expect(objValidate.items["user_first_name"].status).to.be.true
            $("#new_user #user_first_name").val("")
            $("#new_user #user_first_name").blur();
            expect(objValidate.items["user_first_name"].status).to.be.false;
            //======just clicking size chart form to check the code
            $(".size-chart td").click();
        });

        it('Test 2 Case When Only Last Name is there and removed', function () {

            $("#new_user #user_last_name").val("dugar")
            $("#new_user #user_last_name").blur();
            expect(objValidate.items["user_last_name"].status).to.be.true
            $("#new_user #user_first_name").val("")
            $("#new_user #user_first_name").blur();
            expect(objValidate.items["user_first_name"].status).to.be.false;
        });


        it('Test 3 Case When Only Email is there and ajax call true', function (done) {
            var post = sinon.stub($, 'ajax');
            post.yieldsTo('success', [true]);
            $("#new_user #user_email").val("dugararchit@gmail.com")
            $("#new_user #user_email").blur();
            expect(uniqueness_checked).to.be.equal(1);
            expect(emailPerfect).to.be.true;
            post.restore();
            done();

        });

        it('Test 4 Case When Only Email is there and ajax call fails', function (done) {
            var post = sinon.stub($, 'ajax');
            post.yieldsTo('success', [false]);
            $("#new_user #user_email").val("dugararchit@gmail.com")
            $("#new_user #user_email").blur();
            expect(uniqueness_checked).to.be.equal(0);
            expect(emailPerfect).to.be.false;
            post.restore();
            done();
        });


        it('Test 5 Case When wrong email domain is entered', function () {
            $("#new_user #user_email").val("dugararchit@archit.actorsssss")
            $("#new_user #user_email").blur();
            expect(objValidate.items["user_email"].status).to.be.false
        });


        it('Test 6 Case When right email domain is entered but different one ', function () {
            $("#new_user #user_email").val("dugararchit@archit.actor")
            $("#new_user #user_email").blur();
            expect(objValidate.items["user_email"].status).to.be.true
        });

        it('Test 7 Case When email entered is not right', function () {
            $("#new_user #user_email").val("dugararchitgmail.com")
            $("#new_user #user_email").blur();
            expect(objValidate.items["user_email"].status).to.be.false
        });

        it('Test 8 Case when us zip is not entered correctly', function () {
            $("#new_user #user_client_attributes_shipping_postcode").val("941075")
            $("#new_user #user_client_attributes_shipping_postcode").blur();
            expect(objValidate.items["user_client_attributes_shipping_postcode"].status).to.be.false
        });

        it('Test 9 Case when all values are filled and form submitted', function (done) {
            $('#new_user').attr("action", "https://www.stitchfix.com/?utm_campaign=68ba126472fa2d9a8bb75a848dbd29cd&amp;&amp;utm_medium=other");
            var post = sinon.stub(jQuery, 'ajax');
            post.yieldsTo('success', {"success": true, "postal_code": null, "is_mobile": false});
            $("#new_user #user_first_name").val("archit")
            $("#new_user #user_last_name").val("dugar")
            $("#new_user #user_email").val("archiasd@gmail.com")
            $("#new_user #user_client_attributes_shipping_postcode").val("94107")
            $(".rbtn-scale[value=39]").parent().addClass("active");
            $(".rbtn-scale[value=39]").attr("checked", "checked");
            $("#new_user .submit").click();
            post.restore();
            done();
            this.clock.tick(10);
            expect(objValidate.status).to.be.true
        });

        it('Test 10 Case when all values are filled but form not submitted', function (done) {
            var post = sinon.stub(jQuery, 'ajax');
            post.yieldsTo('success', {"success": true, "postal_code": null, "is_mobile": false});
            $("#new_user #user_first_name").val("archit")
            $("#new_user #user_last_name").val("dugar")
            //===wrong is entered
            $("#new_user #user_email").val("archiacom")
            $("#new_user #user_client_attributes_shipping_postcode").val("94107")
            $(".rbtn-scale[value=39]").parent().addClass("active");
            $(".rbtn-scale[value=39]").attr("checked", "checked");
            $("#new_user .submit").click();
            this.clock.tick(10);
            expect(objValidate.status).to.be.false
            post.restore();
            done();
        });

        it('Test 11 Case when all values are filled and covering case with no query params', function (done) {
            $('#new_user').attr("action", "https://www.stitchfix.com/");
            var post = sinon.stub(jQuery, 'ajax');
            post.yieldsTo('success', {"success": true, "postal_code": null, "is_mobile": false});
            $("#new_user #user_first_name").val("archit")
            $("#new_user #user_last_name").val("dugar")
            //===wrong is entered
            $("#new_user #user_email").val("archia@gmail.com")
            $("#new_user #user_client_attributes_shipping_postcode").val("94107")
            $(".rbtn-scale[value=39]").parent().addClass("active");
            $(".rbtn-scale[value=39]").prop("checked", true);
            $("#new_user .submit").click();
            this.clock.tick(10);
            expect(objValidate.status).to.be.true
            post.restore();
            done();
            
        });
    });

    describe("Validate Functionality for form New User Pop Up Form", function () {
        //======cases for pop up form

        it('Test 12 Case When Only First Name is there and removed', function () {
            $("#new_user_pop #user_first_name").val("dugar")
            $("#new_user_pop #user_first_name").blur();
            expect(objValidatePop.items["user_first_name"].status).to.be.true
            $("#new_user_pop #user_first_name").val("")
            $("#new_user_pop #user_first_name").blur();
            expect(objValidatePop.items["user_first_name"].status).to.be.false;
        });

        it('Test 13 Case When Only Last Name is there and removed', function () {
            $("#new_user_pop #user_last_name").val("dugar")
            $("#new_user_pop #user_last_name").blur();
            expect(objValidatePop.items["user_last_name"].status).to.be.true
            $("#new_user_pop #user_last_name").val("")
            $("#new_user_pop #user_last_name").blur();
            expect(objValidatePop.items["user_last_name"].status).to.be.false;
        });

        it('Test 14 Case When Only Email is there and removed', function () {
            $("#new_user_pop #user_email").val("dugararchit@gmail.com");
            $("#new_user_pop #user_email").blur();
            expect(objValidatePop.items["user_email"].status).to.be.true;
            $("#new_user_pop #user_email").val("");
            $("#new_user_pop #user_email").blur();
            expect(objValidatePop.items["user_email"].status).to.be.false;
        });


        it('Test 15 Case when all values are filled and form submitted', function (done) {
            var post = sinon.stub($, 'ajax');
            post.yieldsTo('success', [true]);
            $('#new_user_pop').attr("action", "https://www.stitchfix.com/?utm_campaign=68ba126472fa2d9a8bb75a848dbd29cd&amp;&amp;utm_medium=other");
            $("#new_user_pop #user_first_name").val("archit")
            $("#new_user_pop #user_last_name").val("dugar")
            $("#new_user_pop #user_email").val("archiasd@gmail.com")
            $("#new_user_pop .submit").click();
            this.clock.tick(10);
            expect(objValidatePop.status).to.be.true
            post.restore();
            done();

        });

        it('Test 16 Case when all values are filled and something went wrong', function (done) {
            var post = sinon.stub($, 'ajax');
            post.yieldsTo('success', [true]);
            $("#new_user_pop #user_first_name").val("archit")
            $("#new_user_pop #user_last_name").val("dugar")
            $("#new_user_pop #user_email").val("archiasd")
            $("#new_user_pop .submit").click();
            this.clock.tick(10);
            expect(objValidatePop.status).to.be.false
            post.restore();
            done();
        });

        it('Test 17 Case when all values are filled and form submitted with no query params in the action string', function (done) {
            var post = sinon.stub($, 'ajax');
            post.yieldsTo('success', [true]);
            $('#new_user_pop').attr("action", "https://www.stitchfix.com/");
            $("#new_user_pop #user_first_name").val("archit")
            $("#new_user_pop #user_last_name").val("dugar")
            $("#new_user_pop #user_email").val("archiasd@gmail.com")
            $(".rbtn-scale-pop").parent().removeClass("active");
            $(".rbtn-scale-pop").attr("checked", "");
            $("#new_user_pop .submit").click();
            this.clock.tick(10);
            expect(objValidatePop.status).to.be.true
            post.restore();
            done();
        });

    });

    describe("Test cases for new size xxl", function () {
        it("Test 18 Test No of sizes available", function () {
            expect($(".rbtn-scale").length).to.be.equal(6)
            expect($(".rbtn-scale-pop").length).to.be.equal(6)
        });

        it("Test 19 Value for size xxl to be equal to 119", function () {
            expect($($(".rbtn-scale#user_client_attributes_scalar_attributes_attributes_dress_generic_size_id_119")[0]).val()).to.be.equal("119")
            expect($($(".rbtn-scale-pop#user_client_attributes_scalar_attributes_attributes_dress_generic_size_id_119")[0]).val()).to.be.equal("119")
        });

        it('Test 20 When form filled without size selected', function (done) {
            var post = sinon.stub($, 'ajax');
            post.yieldsTo('success', [true]);
            $("#new_user #user_first_name").val("archit")
            $("#new_user #user_last_name").val("dugar")
            $("#new_user #user_email").val("archiasd@gmail.com")
            $(".rbtn-scale").parent().removeClass("active");
            $(".rbtn-scale").prop("checked", false);
            $("#new_user .submit").click();
            this.clock.tick(10);
            expect(objValidate.status).to.be.false
            post.restore();
            done();
        });

        it('Test 21 When size selected is xxl and submit form and check', function (done) {
            var post = sinon.stub($, 'ajax');
            post.yieldsTo('success', [true]);
            $("#new_user #user_first_name").val("archit")
            $("#new_user #user_last_name").val("dugar")
            $("#new_user #user_email").val("archiasd@gmail.com")
            $(".rbtn-scale").parent().removeClass("active");
            $(".rbtn-scale[value=119]").prop("checked", true);
            $(".rbtn-scale[value=119]").parent().addClass("active");
            $("#new_user .submit").click();
            this.clock.tick(10);
            expect($(".rbtn-scale[type=radio]:checked").val()).to.be.equal("119")
            expect(objValidate.status).to.be.true
            post.restore();
            done();
        });
    });
});
