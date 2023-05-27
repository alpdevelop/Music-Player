class Music{
    constructor(title, singer, img, file){
        this.singer = singer;
        this.title = title;
        this.img = img;
        this.file = file;
    }
    getName(){
        return this.title + " - " + this.singer 
    }

}

const musicList = [
    new Music("Gülden Karaböcek", "Hatıran Yeter", "1.jpg", "gülden.mp3"), // Classtaki değerlere uygun bir şekilde yeni bir müzik listesi hazırlaya bilirisniz.
    new Music("Kamuran Akkor","Bir Ateşe Attın", "2.jpg", "Kamuran.mp3"), // assets klasörüne dinlemek istediğiniz müzikleri taşıyın.
    new Music("Müslüm Gürses","Seni Yazdım", "3.jpg", "müslüm.mp3") // dosya adları ve uzantılarını doğru bir şekilde yazdığınızdan emin olun.

]