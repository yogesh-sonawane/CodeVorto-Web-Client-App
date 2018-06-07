/*
class UserMaster {
    constructor(user) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.dateOfBirth = user.dateOfBirth;
    }
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    set fullName(fullName) {
        var name = fullName.split(' ');
        if (name.length <= 1) throw new Error(`Parameter must contain at least one space. Parameter value: ${fullName}`);
        this.firstName = name.shift();
        this.lastName = name.shift();
    }

    get age() {
        var todayDate = Date.parse(new Date());
        var dateMiliseconds = Date.parse(this.dateOfBirth);
        var ageMilisecond = todayDate - dateMiliseconds;
        var value = ageMilisecond.toString().replace(/[^\d\.eE-]/g, '');
        var _age = Math.round(value * 3.1688738506811E-11);
        return _age;
    }
}
*/

var UserMaster = (function () {
    function UserMaster(user) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.dateOfBirth = user.dateOfBirth;
    }
    Object.defineProperty(UserMaster.prototype, "fullName", {
        get: function () {
            return this.firstName + " " + this.lastName;
        },
        set: function (fullName) {
            var name = fullName.split(" ");
            if (name.length <= 1)
                throw new Error("Parameter must contain at least one space. Parameter value: " + fullName);
            this.firstName = name.shift();
            this.lastName = name.shift();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserMaster.prototype, "age", {
        get: function () {
            var todayDate = Date.parse(new Date().toLocaleDateString());
            var dateMiliseconds = Date.parse(this.dateOfBirth.trim());
            var ageMilisecond = todayDate - dateMiliseconds;
            var value = ageMilisecond.toString().replace(/[^\d\.eE-]/g, '');
            var _age = Math.round(parseInt(value) * 3.1688738506811E-11);
            return _age;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserMaster.prototype, "surname",
        {
            
        });
    return UserMaster;
}());