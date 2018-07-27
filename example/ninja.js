class Ninja {
    introduce() {
        console.log('I am a Ninja !!!');
    }
    attack() {
        this.weapon.slash();
        this.throwableWeapon.throw();
    }
}
Ninja._dependencies = ['weapon', 'throwableWeapon'];

module.exports = Ninja;