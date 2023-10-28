# Web Perpustakaan

## Setup Project

    Todo:
    1.  npm install
    2.  hapus file dan code yang tidak diperlukan
    3.  jalakan server: npm run dev
    4.  pada browser:[http://localhost:3000](http://localhost:3000/)

## Navbar & Register Page

    Todo:
    1.  install package
        - npm i bootstrap axios react-router-dom boxicons --save
    2.  assets/images
        - imageRegister.png
        - background.png
    3.  pages/Register/index.jsx
        - import dan pasang imageRegitser
    4.  main.jsx
        - import bootstrap
    5.  App.css
        - css themplate
    6.  pages/index.jsx
        - import dan export Register
    7.  components/Navbar/index.jsx
    8.  components/atoms/Input/index.jsx
    9.  components/atoms/Button/index.jsx
    10. components/atoms/Gap/index.jsx
    11. components/atoms/index.jsx
        - import dan export Input
        - import dan export Button
        - import dan export Gap
    12.  App.jsx
        - import dan pasang Navbar
        - import dan pasang Register
    13.  jalakan server: npm run dev
    14.  pada browser:http://localhost:3000/register

## Login Page

    Todo:
    1.  assets/images
        - imageLogin.png
    2.  pages/Login/index.jsx
        - import dan pasang imageLogin
        - import dan pasang Button, Input, Gap
    3.  App.jsx
        - import dan pasang Login
    4.  jalakan server: npm run dev
    5.  pada browser:http://localhost:3000/login

## Login Acction, & save login into Local Storage

    Todo:
    1.  install react-redux reduxjs/toolkit
        - npm i react-redux @reduxjs/toolkit
    2.  redux/slices/users/userSlices.js
        - initialstate
            - userInfo: save the lcoal storage
        - Login Action
            - import dan pasang createAsyncThunk
            - import dan pasang axios
            - save the user into localstorage
        - Users slices
            - Login
            - handle fullfilled state
            - Handle the rejection
        - generate reducer
        - export default usersReducer;
    3.  redux/store/store.js
        - Store
            - import dan pasang {configureStore}  from "@reduxjs/toolkit"
            - import dan pasang usersReducer
            - export default store
    4.  main.js
        - bungkus App didlam Provider
            - import dan { Provider } from "react-redux
        - didalam Provider parsing data store={store}
            - import dan pasang store
    5.  pages/Login/index.jsx
        - dispatch
            - import dan pasang useDispatch from react-redux
        - hook from data
        - handle form change
        - handle from submit
            - dispatch action
                - import dan pasang loginAction
            - reset form data
        - pada form pasang onSubmit & parsing handleSubmit
        - implement handleChange pada onChange
        - value isi dengan formData.username dll
    6.  jalakan server
        - backend: flask run
        - client: npm run dev
    7.  pada browser:http://localhost:3000/login
        - login dengan user terdaftar
        - lihat pada console.log dan redux, jika berhasil akan ada data yang tersimpan pada localStorage

## Success , loading components & redirect to user-profile page

    Todo:
    1.  install react-loading & sweetalert2
        - npm i react-loading sweetalert2
    2.  components/atoms/Alert/LoadingComponents.jsx
        - import dan pasang ReactLoading
        - styling loading
    3.  components/atoms/Alert/SuccessMessage.jsx
        - import dan pasang useDispatch
        - import dan pasang sweetalert2
        - import dan pasang resetSuccessAction
    4.  redux/slices/users/globalSlice/globalSlice.jsx
        - reset success action
    5.  redux/slices/users/userSlices.js
        - pada User Slices -> loginAction.fulfilled tambahkan success = true
        - reset success action
    6.  pages/Login/index.jsx
        - store data
            - import dan pasang useSelector
        - implement success message
        - navigation
            - import dan pasang useNavigate
        - redirect
            - import dan pasang useEffect
            - kondisi jika access_tokennya ada,
              akan di redirect ke halaman user-profile
    7.  pages/User/Profile.jsx
        - rafc
    8.  App.jsx
        - import dan pasang Profile
    9.  jalakan server
        - backend: flask run
        - client: npm run dev
    10. pada browser:http://localhost:3000/login
        - login dengan user terdaftar
        - akan ada alert dari sweetalert2 (success message)
        - akan di redirect ke halaman user-profile:
          http://localhost:3000/user-profile

## Error Messages

    Todo:

    1.  components/atoms/Alert/ErrorMessage.jsx
        - import dan pasang useDispatch
        - import dan pasang sweetalert2
        - import dan pasang resetErrorAction
    2.  redux/slices/users/globalSlice/globalSlice.jsx
        - reset error action
    3.  redux/slices/users/userSlices.js
        - reset error action
    4.  pages/Login/index.jsx
        - pada store data
            - tambahkan error
        - implement error message
            - import dan pasang ErrorMessage
    5.  jalakan server
        - backend: flask run
        - client: npm run dev
    6.  pada browser:http://localhost:3000/login
        - login dengan user yang tidak terdaftar
        - akan ada alert dari sweetalert2 (error message)

## Profile page

    Todo:

    1.  pages/User/Profile.jsx
        - styling using bootstrap 5
    2.  jalakan server
        - backend: flask run
        - client: npm run dev
    3.  pada browser:http://localhost:3000/login
        - login dengan user yang  terdaftar
        - akan ada alert dari sweetalert2 (success message)
        - dan akan di arahkan kehalaman user-profile
          http://localhost:3000/user-profile

## Logout user dan private navbar

    Todo:

    1.  components/Navbar/index.jsx
        - get the login user from store
            - import dan useSelector
            - implement isLoggin pada button login, register & logout
        - dispatch
            - handleLogout
            - import dan pasang useDispatch
            - import dan pasang logoutAction
            - reload
    2.  redux/slices/users/usersSlices.jsx
        - Logout action
    3.  jalakan server
        - backend: flask run
        - client: npm run dev
    4.  pada browser:http://localhost:3000/
        - klik button logout, userInfo(berisi data user setelah berhasil login)
          akan terhapus dari local storage
        - button logout akan hilang digantikan dengan button login dan register

## Protected component

    Todo:

    1.  components/AuthRoute/ProtectedRoute.jsx
        - rafc ( parsing {children})
        - Check if user is login
            - import dan useSelector
            - get access_token
            - implement access_token untuk kondisi
            - import dan pasang Navigate
        - dispatch
            - handleLogout
            - import dan pasang useDispatch
            - import dan pasang logoutAction
            - reload
    2.  App.jsx
        - import dan pasang ProtectedRoute
        - bungkus Profile dengan ProtectedRoute
    3.  jalakan server
        - backend: flask run
        - client: npm run dev
    4.  pada browser:http://localhost:3000/
        - jika user belum login tidak akan bisa mengakses halaman profile
        - jika user sudah login bisa akses halaman login

## Register action & error validation

    Todo:

    1.  redux/slices/users/usersSlices.jsx
        - Register Action ( copy dari loginAction)
            - make request
        - pada Users slices
            - Register
            - handle fullfilled state
            - Handle the rejection
    2.  pages/Register/index.jsx
        - hook from data
        - handle form change
        - handle from submit
            - dispatch action
        - reset form data
        - implement handleSubmit pada form
        - implement formData pada value
        - implement handleChange pada onChange
        - Navigation
        - dispatch
        - store data
            - redirect
        - implement SuccessMesage
            - import dan pasang SuccessMesage
        - implement vaidation error
    3.  jalakan server
        - backend: flask run
        - client: npm run dev
    4.  pada browser:http://localhost:3000/register
        - coba beberapa kondisi agar error validation dapat tampil:
            - klik button register dengan kondisi from kosong,
            - dll..

## Admin Page & Admin Profile

    Todo:
    1.  Dari template admin copy & paste folder
        css,img,js & vendor kedakam folder public
    2.  index.html
        - panggil semua link & script yang berhubungan dengan template
    3.  pages/Admin/AdminDashboard/AdminDashboard.jsx
        - import dan pasang NavbarAdmin
    4.  components/Admin/NavbarAdmin/NavbarAdmin.jsx
        - import dan pasang useSelector
        - get the login user role
        - implement the login user role
        - import dan pasang Link
        - pasang juga reloadDocument di dalam Link,tujuannya untuk mereload halaman,
          untuk mengatasi button togglednya yang tidak berfungsi
    5.  components/Admin/SidebarAdmin/SidebarAdmin.jsx
        - hooks style
        - changestyle , digunakan agar button toggled nya berfungsi
        - implement changestyle
    6.  components/Admin/FooterAdmin/FooterAdmin.jsx
    7.  components/Admin/LogoutAdmin/LogoutAdmin.jsx
    8.  pages/Login/index.jsx
        - get the token user & admin
        - pada useEffect jika role= User akan redirect ke halaman User,
          dan begitupun jika role=Super Admin
    9.  App.jsx
        - get the role user
        - implement isLogginAdmin & isLoginUser
        - import dan pasang AdminDashboard
        - note: disini karna mempunyai 2 tampilan yang berbeda
          jd harus dilakukan pengkodisian untuk tampilan admin dan user
    10. components/Navbar/index.jsx
        - get the access_token
        - import dan pasang useEffect
        - isLogin digunakan untuk memproteksi halaman
          jika user yang belum login ingin akses halaman yang terproteksi
          akan di redirect ke halaman login
    11. jalakan server
        - backend: flask run
        - client: npm run dev
    12. pada browser:
        - http://localhost:3000/login
            - login sebagai Super Admin
            - login sebagai user
    13. pages/Admin/AdminProfile/AdminProfile.jsx
        - import dan pasang AdminProfile
        - npm install react-calendar
        - State to manage the selected date
        - handleDateChange
        - implement Calender
    14.  jalakan server
        - backend: flask run
        - client: npm run dev
    15. pada browser:
        - setelah login dengan Super Admin berhasil klik avatar pada navbar, akan muncul menu profile,
          kemduain klik
        - akan di redirect ke halaman admin-profile

## Perbaikan structure globalSlice

## Menangani sementara bug pada halaman register tidak bisa di akses

    Todo:
    1.  components/Navbar/index.jsx
        - menambahkan kondisi if pada useEffect untuk halaman register

## Menampilkan data Users

    Todo:
    1.  src/redux/slices/users/usersSlices.jsx
        - Get All Users Action
        - tambahkan header Authorization dengan nilai Bearer access_token
        - pada Users slices tambahkan :
            - Get All Users
            - handle fullfilled state
            - Handle the rejection
    2.  pages/Admin/Users/index.jsx
        - rafc
        - siapkan dispatch
            - import useDispatch
        - akses fungsi redux
        - get all data user(dengan useEffect)
            - pasang dispath
            - import dan pasang getAllUsersAction
        - implement data user pada table
        /****************************************************************
        *                            NOTED:                            *
        * JIKA DIPERHATIKAN PADA PERULANGAN UNTUK MENGAMBIL DATA USERS *
        * KITA MENGGUNAKAN USER.DATA KARNA MEMANG DIDALAM DATA INILAH  *
        *               TERDAPAT ARRAY DARI SETIAP USER                *
        ****************************************************************/
    3.  App.jsx
        - import dan pasang User dengan route/path list-user
    4.  components/Admin/SidebarAdmin.jsx
        - pasang Link yang menuju halaman list-users

## Redirect ke halaman login jika access_token expired

    Todo:

    1.  components/atoms/Alert/SessionExpiredAlert.jsx
        - import sweetalert2 untuk tampilan notifkasi
    2.  pages/Admin/Users/index.jsx
        - pada useEffect
            - Check for 401 status code and show alert if found
            - kondisi yang dipakai disesuaikan dengan response error dari api
            - import dan pasang SessionExpiredAlert
       /*****************************************************************
        *                            NOTED:                             *
        *    ACCESS_TOKEN DEFAULTNYA HABIS SELAMA 15 SETELAH LOGIN,     *
        * JD AKAN TAMPIL ALERT NOTIFIKASI YANG DIPASANG SETELAH 15MENIT *
        *****************************************************************/

## Modifikasi Get All Users Action

    Todo:
    1.  src/redux/slices/users/usersSlices.jsx
        - pada Get All Users Action
            data access_token di simpan dulu kedalam variable config
            agar lebih mudah dipahami

## Detail User berdasarkan(id_user)

## Create Category

    Todo:
    1.  src/redux/slices/users/usersSlices.jsx
        - Add Category Action
        - category slice
            - create category
            - handle fullfilled state
            - Handle the rejection
    2.  pages/Admin/Categories/index.jsx
        - tambah acces fungsi category pada dispatch
        - formData
        - State  untuk data kategori
        - Track modal state
        - pasaang handleCange
        - pasang handleModalOpen
        - pasang handleModalClose
        - implement modal dengan form input category
        - form add category
            - pasang preventDefault()
            - pasang dispatch asign addCategoryAction asign formData
            - import addCategoryAction
        - pasang useEffect di mana jika status dari category bernilai "CREATED"
          akan menampilkan pesan success
          - jika status dari category bernilai "CREATED" juga setIsModalOpen(false)
          - dan kosongkan form category
          - pasang dispatc asign resetCreateAction()
            ini agar status dari category di reset ketika button dari alert di close
          - import resetCreateAction
          - update data table category setelah category berhasil di created
        - implement error jika data nya kosong dll
    3.  redux/slices/globalSlice/globalSlice.jsx
        - reset create action
    4.  redux/slices/categories/categoriesSlice.jsx
        - reset create action

       /*************************************************************
        *                          NOTED:                           *
        *        SESET CREATE ACTION DIPASANG UNTUK MERESET         *
        * NILAI DARI CATEGORY KETIKA BERHASIL MELAKUKAN CREATE DATA *
        *************************************************************/

## Create Category Modal file

    Todo:
    1.  pages/Admin/Categories/CreateCategoryModal.jsx
        - rafce
        - siapkan dispatch
        - state from data category
        - handleChange
        - akses fungsi redux
            - import dan pasang useSelector
        - form add category
            -pasang dispatch asign addCategoryAction asign formData
            - import dan pasang addCategoryAction
        - implementasi modal
        - import dan pasang Input
            - pasang onChange asign handleChange
            - pasang value asign formData.category
        - pasang loading
            - import dan pasang LoadingComponent pada logic button Add Category
        - implementasi error message
    2.  pages/Admin/Categories/index.jsx
        - hapus modal dan code yang tidak diperlukan
        - import dan pasang CreateCategoryModal.jsx

       /*********************************************************************
        *                              NOTED:                               *
        *       MODAL DIBUAT FILE TERPISAH AGAR MUDAH DI MAINTENANCE        *
        * DAN AGAR PADA FILE INDEX UNTUK CATEGORY TIDAK TERLALU BANYAK CODE *
        *********************************************************************/

## Pasang edit category modal

    Todo:
    1.  pages/Admin/Categories/index.jsx
        - State untuk modal edit
        - state edit category
        - handleEditChange
        - handleEditModalOpen
        - handleEditModalClose
        - pasang handleEditClick
           - Ketika ikon edit diklik, isi data kategori yang akan diedit
           - Buka modal edit
        - implement handleEditClick()
        - import dan pasang EditCategoryModal
    2.  pages/Admin/Categories/EditCategoryModal.jsx
        - rafc
        - pasang props isOpen, onClose, editCategoryData, handleEditChange
        - implement props yang dipasang
    3.  pengujian pada browser:
        http://127.0.0.1:3000/list-categories
        klik icon/button pencil , akan tampil modal yang isinya form edit dari data yang di klik(data tampil)

           /***************************************************************************************
            *                                       NOTED:                                        *
            *         PROPS YANG DIPASANG PADA EditCategoryModal NANTINYA AKAN DIGUNAKAN          *
            *                 PADA SAAT PEMANGGILAN COMPONENT EditCategoryModal.                  *
            * PADA COMMIT SAAT INI HANYA BARU BISA MENAMPILKAN MODAL+FORM DARI DATA YANG DI PILIH *
            ***************************************************************************************/

## Action update category

    Todo:
    1.  redux/slice/categories/categoriesSlices.jsx
        - update category
        - pada Categories slices
            - update category
            - handle fullfilled state
            - Handle the rejection
    2.  pages/Admin/Categories/EditCategoryModal.jsx
        - pasang props handleEditSave
        - implement props yang dipasang pada onClick
    3.  pages/Admin/Categories/index.jsx
        - handle edit category save
            - Kirim pembaruan kategori
            - Tutup modal edit
            - Refresh daftar kategori setelah pembaruan
        - implement handleEditSave
        - munculkan alert dengan menambahkan code "jika atau" dengan
          status yang diambil dari api yakni status bernilai "OK"
          maka alert success update akan muncul
    4.  pengujian pada browser:
        - http://127.0.0.1:3000/list-categories
        - klik icon/button pencil , akan tampil modal yang isinya form edit
          dari data yang di klik(data tampil)
        - coba ubah isi datnya, akan ada pesan success dan data akan berubah

           /***********************************************************************************
            *                                     NOTED:                                      *
            *                PERLU DIKETAHUI PENAMAAN handleEditSave INI KARNA                *
            *     KITA JUGA MENGOPER PROPS handleEditSave PADA FILE EDITCATEGORYMODAL.JSX     *
            * SEDANGKAN PADA ISINYA "handleEditSave" KITA MENGGUNAKAN FUNCTION YANG KITA BUAT *
            ***********************************************************************************/

## Menampilkan data yang baru dibuat pada urutan pertama

    Todo:

    1.  pages/Admin/Categories/index.jsx
        - implement newCategory modification
        - rubah button edit agar lebih menarik
        - memasang timer pada popup sweetalert2
    2.  pengujian pada browser:
        - http://127.0.0.1:3000/list-categories
        - klik button category + , kemudian create data baru
        - jika berhasil akan ada pesan success dengan timer
          yang akan menutup sendiri dengan durasi/ bisa juga di klik
        - data baru akan tampil pada urutan pertama
          serta ada keterangan data baru

## Create Publihser

    Todo:

    1.  pages/Admin/Publishers/index.jsx
        - pada akses fungsi redux tambahkan publisher
        - state from data publisher
        - State  untuk data publisher
        - Track modal state
        - handleModalOpen
        - handleModalClose
        - import dan pasang useEffect
            - kondisi status publisher bernilai "CREATED"
            - pasang sweetalert2 untuk success messaage
            - pada then , Tutup modal
        - implement handleModalOpen pada button "Publisher +"
        - import dan pasaang CreatePublisherModal
    2.  redux/slices/publishers/publishersSlices.jsx
        - Add Publisher Action
            - make request
            - try-catch
                - Mengambil access token dari informasi userAuth
                - Melakukan permintaan GET ke endpoint http://localhost:5000/perpus-api/v1/users
                - Menambahkan header Authorization dengan nilai Bearer access_token
                - pasang endpoint crete publisher
        - pada publisher slices
            - create publisher
            - handle fullfilled state
            - Handle the rejection
            - reset create action
    3.  pages/Admin/Publishers/CreatePublisherModal.jsx
        - rafc
            - parsing daata untuk props : isOpen, onClose
        - siapkan dispatch
        - state from data publisher
        - handleChange
            - Check if the input name is "phone_number" and add the prefix if not already present
        - akses fungsi redux
            - error, loading
            - import dan pasang useSelector
        - form add publisher
            - import dan pasang addPublisherAction
        - implement modal untuk add Publisher
            - pasang onClose pada button
            - pasang handleSubmit pada form
            - import dan pasang Input
                - pasang semua feld yang dibutuhkan
        - pasang error pada setiap form input pada modal
    4.  components/atoms/Input/index.jsx
        - modofikasi input components dengan menambahkan label
    5.  pengujian pada browser:
        - http://127.0.0.1:3000/list-categories
        - klik button category + , kemudian create data baru
        - jika berhasil akan ada pesan success dengan timer
          yang akan menutup sendiri dengan durasi/ bisa juga di klik
        - data baru akan tampil pada urutan pertama
          serta ada keterangan data baru
        - akan ada error jika data kosong dan tidak sesuai ketentuan

## Pebaiki doble data pada tabel publisher

    Todo:

    1.  pages/Admin/Publishers/index.jsx
        - hapus perulangan dengan map

## Update publisher

    Todo:

    1.  redux/slices/publishers/publishersSlices.jsx
        - update publisher
        - endpoint dengan patch
        - pada Publisher slices
            - update publisher
            - handle fullfilled state
            - Handle the rejection
     2.  pages/Admin/Publishers/EditPublisherModal.jsx
        - copy file CreatePublisherModal.jsx
          kemudian modifikasi untuk modal edit publisher
        - parsing props:
            isOpen,
            onClose,
            editPublisherData,
            handleEditChange,
            handleEditSave,
        - implement pada form input edit publisher data
        - pada buttonpasang handleEditSave pada onClick
    3.  pages/Admin/Publishers/index.jsx
        - State untuk modal edit
        - state edit publisher
        - handleEditChange
        - handleEditModalOpen
        - handleEditModalClose
        - pasang handleEditClick
            - Ketika ikon edit diklik, isi data publisher yang akan diedit
            - Buka modal edit
            - handle edit publisher save
            - Kirim pembaruan kategori
            - unwrap()
            - Tutup modal edit
            - Refresh daftar kategori setelah pembaruan
        - pada useEffect tambahkan condisi if jika status publisher benilai ok
          maka update berhasil dan alert akan tampil
        - pasang icon edit berdasarkan id, name, email dan phone_number
        - import dan pasang EditPublisherModal
    4.  pengujian pada browser:
        - http://127.0.0.1:3000/list-categories
        - klik button category + , pada icon edit klik salah untuk memilih salah satu data
          yang ingin di edit
        - jika berhasil akan ada pesan success dengan timer
          yang akan menutup sendiri dengan durasi/ bisa juga di klik
        - data baru akan tampil pada urutan pertama
          serta ada keterangan data baru

## Create Author

    Todo:

    1.  pages/Admin/Authors/index.jsx
        - pada akses fungsi redux tambahkan author
        - state from data author
        - State  untuk data author
        - Track modal state
        - handleModalOpen
        - handleModalClose
        - import dan pasang useEffect
            - kondisi status author bernilai "CREATED"
            - pasang sweetalert2 untuk success messaage
            - pada then , Tutup modal
        - implement handleModalOpen pada button "Author +"
        - import dan pasaang CreateAuthorModal
    2.  redux/slices/authors/authorsSlices.jsx
        - Add Author Action
            - make request
            - try-catch
                - Mengambil access token dari informasi userAuth
                - Melakukan permintaan GET ke endpoint http://localhost:5000/perpus-api/v1/users
                - Menambahkan header Authorization dengan nilai Bearer access_token
                - pasang endpoint crete author
        - pada author slices
            - create author
            - handle fullfilled state
            - Handle the rejection
            - reset create action
    3.  pages/Admin/Authors/CreateAuthorModal.jsx
        - rafc
            - parsing daata untuk props : isOpen, onClose
        - siapkan dispatch
        - state from data author
        - handleChange
            - Check if the input name is "phone_number" and add the prefix if not already present
        - akses fungsi redux
            - error, loading
            - import dan pasang useSelector
        - form add author
            - import dan pasang addAuthorAction
        - implement modal untuk add Author
            - pasang onClose pada button
            - pasang handleSubmit pada form
            - import dan pasang Input
                - pasang semua feld yang dibutuhkan
        - pasang error pada setiap form input pada modal
    4.  pengujian pada browser:
        - http://127.0.0.1:3000/list-authors
        - klik button author + , kemudian create data baru
        - jika berhasil akan ada pesan success dengan timer
          yang akan menutup sendiri dengan durasi/ bisa juga di klik
        - data baru akan tampil pada urutan pertama
          serta ada keterangan data baru
        - akan ada error jika data kosong dan tidak sesuai ketentuan

## Update author

    Todo:

    1.  redux/slices/authors/authorsSlices.jsx
        - update author
        - endpoint dengan patch
        - pada Author slices
            - update author
            - handle fullfilled state
            - Handle the rejection
     2.  pages/Admin/Authors/EditAuthorModal.jsx
        - copy file CreateAuthorModal.jsx
          kemudian modifikasi untuk modal edit author
        - parsing props:
            isOpen,
            onClose,
            editAauthorData,
            handleEditChange,
            handleEditSave,
        - implement pada form input edit author data
        - pada buttonpasang handleEditSave pada onClick
    3.  pages/Admin/Authors/index.jsx
        - State untuk modal edit
        - state edit author
        - handleEditChange
        - handleEditModalOpen
        - handleEditModalClose
        - pasang handleEditClick
            - Ketika ikon edit diklik, isi data author yang akan diedit
            - Buka modal edit
            - handle edit author save
            - Kirim pembaruan kategori
            - unwrap()
            - Tutup modal edit
            - Refresh daftar kategori setelah pembaruan
        - pada useEffect tambahkan condisi if jika status author benilai ok
          maka update berhasil dan alert akan tampil
        - pasang icon edit berdasarkan id, name, email dan phone_number
        - import dan pasang EditAuthorModal
    4.  pengujian pada browser:
        - http://127.0.0.1:3000/list-authors
        - klik button author + , pada icon edit klik salah untuk memilih salah satu data
          yang ingin di edit
        - jika berhasil akan ada pesan success dengan timer
          yang akan menutup sendiri dengan durasi/ bisa juga di klik
        - data baru akan tampil pada urutan pertama
          serta ada keterangan data baru

           /********************************************************************
            *                              NOTED:                              *
            * PADA handleEditClick UNTUK URUTAN PROPS HARUS SESUAI URUTAN FORM *
            *                     AGAR DATA TIDAK TERTUKAR                     *

## List Books

    Todo:

    1.  redux/slices/books/booksSlices.jsx
        - duplicate dari categoriesSlices.jsx kedudian modifikasi menjadi booksSlices
        - get all books Action
        - Books slices
            - fetch  all books
            - handle fullfilled state
            - Handle the rejection
        - generate reducer
    2.  redux/store/store.jsx
        - import dan pasang booksReducer
    3.  pages/Admin/Books/index.jsx
        - copy file dari Categories/index.jsx
          kemudian modifikasi untuk Books/index.jsx
        - siapkan dispatch
        - akses fungsi redux
        - get all data books
        - import dan pasang LoadingComponent
        - loop data books(picture, name, publisher name, book title, author name, bookshelf , category )
    4.  App.jsx
        - import dan pasang Books pada path list-books
    5.  components/Admin/SidebarAdmin.jsx
        - pasang link yang menuju list-books
    6.  pengujian pada browser:
        - http://127.0.0.1:3000/list-books
        - akan tampil sluruh data buku

## List Bookshelves

    Todo:

    1.  redux/slices/bookshelves/bookshelvesSlices.jsx
        - duplicate dari categoriesSlices.jsx kedudian modifikasi menjadi bookshelvesSlices
        - get all bookshelves Action
        - Bookshelves slices
            - fetch  all bookshelves
            - handle fullfilled state
            - Handle the rejection
        - generate reducer
    2.  redux/store/store.jsx
        - import dan pasang bookshelvesReducer
    3.  pages/Admin/Bookshelves/index.jsx
        - copy file dari Categories/index.jsx
          kemudian modifikasi untuk Bookshelves/index.jsx
        - siapkan dispatch
        - akses fungsi redux
        - get all data bookshelves
        - import dan pasang LoadingComponent
        - loop data bookshelves(bookshelves)
    4.  App.jsx
        - import dan pasang Bookshelves pada path list-bookshelves
    5.  components/Admin/SidebarAdmin.jsx
        - pasang link yang menuju list-bookshelves
    6.  pengujian pada browser:
        - http://127.0.0.1:3000/list-bookshelves
        - akan tampil sluruh data rak buku/bookshelves

## Create Bookshelf dengan modal

    Todo:
    1.  src/redux/slices/Bookshelves/bookshelvesSlices.jsx
        - Add Bookshelf Action
        - pada Bookshelves slices
            - add bookshelf
            - handle fullfilled state
            - Handle the rejection
    2.  pages/Admin/Bookshelves/index.jsx
        - tambah acces fungsi bookshelf pada dispatch
        - formData
        - State  untuk data bookshelf
        - Track modal state
        - pasaang handleCange
        - pasang handleModalOpen
        - pasang handleModalClose
        - implement modal dengan form input bookshelf
        - form add bookshelf
            - pasang preventDefault()
            - pasang dispatch asign addBookshelfAction asign formData
            - import addBookshelfAction
        - pasang useEffect di mana jika status dari bookshelf bernilai "CREATED"
          akan menampilkan pesan success
          - jika status dari bookshelf bernilai "CREATED" juga setIsModalOpen(false)
          - dan kosongkan form bookshelf
          - pasang dispatc asign resetCreateAction()
            ini agar status dari bookshelf di reset ketika button dari alert di close
          - import resetCreateAction
          - update data table bookshelf setelah bookshelf berhasil di created
        - implement error jika data nya kosong dll
    3.  pages/Admin/Bookshelves/CreateBookshelfModal.jsx
        - rafc : CreateBookshelfModal
        - siapkan dispatch
        - state from data bookshelf
        - handleChange
        - akses fungsi redux (error, loading)
        - form add books
        - pasang handleSubmit pada form onSubmit
        - import dan pasang Input
            - implement handleChange pada onChange
            - implement formData.bookshelf pada value
        - implement error pada form
        - implement onClose pada button onClick
        - implement loading
            - import dan pasang LoadingComponent
    4.  pengujian pada browser:
        - http://127.0.0.1:3000/list-bookshelves
        - klik button + Bookshelf
        - isi form dan klik Add Bookshelf
        - akan ada pesan alert success create data bookshelf

## Update bookshelf

    Todo:

    1.  redux/slices/bookshelves/bookshelvesSlices.jsx
        - update bookshelf
        - endpoint dengan patch
        - pada Bookshelf slices
            - update bookshelf
            - handle fullfilled state
            - Handle the rejection
     2.  pages/Admin/Bookshelves/EditBookshelfModal.jsx
        - copy file CreateBookshelfModal.jsx
          kemudian modifikasi untuk modal edit bookshelf
        - parsing props:
            isOpen,
            onClose,
            editBookshelfData,
            handleEditChange,
            handleEditSave,
        - implement pada form input edit bookshelf data
        - pada buttonpasang handleEditSave pada onClick
    3.  pages/Admin/Bookshelves/index.jsx
        - State untuk modal edit
        - state edit bookshelf
        - handleEditChange
        - handleEditModalOpen
        - handleEditModalClose
        - pasang handleEditClick
            - Ketika ikon edit diklik, isi data author yang akan diedit
            - Buka modal edit
            - handle edit author save
            - Kirim pembaruan bookshelf
            - unwrap()
            - Tutup modal edit
            - Refresh daftar bookshelf setelah pembaruan
        - pada useEffect tambahkan condisi if jika status bookshelf benilai OK
          maka update berhasil dan alert akan tampil
        - pasang icon edit berdasarkan id, bookshelf
        - import dan pasang EditBookshelfModal
    4.  pengujian pada browser:
        - http://127.0.0.1:3000/list-bookshelfs
        - klik button bookshelf + , pada icon edit klik salah untuk memilih salah satu data
          yang ingin di edit
        - jika berhasil akan ada pesan success dengan timer
          yang akan menutup sendiri dengan durasi/ bisa juga di klik
        - data baru akan tampil pada urutan pertama
          serta ada keterangan data baru
