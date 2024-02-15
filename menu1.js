function menuOne() {
    this.respon = function(choice) {
        if(choice === "1"){
            return 'Silahkan pilih kategori data :\n'+
                '11. Sosial dan Kependudukan\n'+
                '12. Ekonomi dan Perdagangan\n'+
                '13. Pertanian dan Pertambangan'
        }else if(choice === "2"){
            return 'Silahkan ketik kata kunci pencarian dengan format sebagai berikut :\n\n'+
                '/s kata kunci pencarian'
        }else if(choice === "3"){
            const date = new Date()
            const hour = new Date().getHours()
            const min = new Date().getMinutes()
            var days = ['Sun','Mon','Tues','Wed','Thrus','Fri','Sat']
            if( hour<=8 && min<=11 || hour>=15 && min>=0 ){
                return 'Anda menghubungi diluar jam layanan. Silahkan hubungi kami kembali saat hari kerja (Senin-Jumat) pukul 08.00-15.00 WIB.\nTerima kasih.'
            }else if(days[date.getDay() === "Sat"] || days[date.getDay()] === "Sat"){
                return 'Anda menghubungi diluar hari kerja. Untuk chat dengan agen hanya dapat dilakukan saat jam kerja.\n Terima kasih.'
            }else{
                return 'Silahkan lakukan registrasi terlebih dahulu melalui link berikut : https://tiket.bpskalteng.id\n\n'+
                'Selanjutnya Anda akan dihubungi oleh agen kami.\nTerima kasih'
                // return 'dan '+date.toLocaleTimeString()
            }
        }else if(choice.toLocaleLowerCase() === "menu"){
            return "Sila pilih menu dibawah ini :\n"+
                "1. Pilih data\n"+
                "2. Cari data\n"+
                "3. Ngobrol sama Agen SiCantik"
        }else{
            return "-"
        }
    }
}

module.exports = menuOne