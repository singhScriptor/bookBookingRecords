document.addEventListener('DOMContentLoaded', reload)

const form = document.getElementById('form')
const activeBooks = document.getElementById('active-books')
const returnBooks = document.getElementById('return-books')

form.addEventListener('submit', addBooks)

async function addBooks(event) {
    event.preventDefault()
    try {
        const takeOn = new Date()
        const returnOff = new Date(takeOn.getTime() + 60 * 60 * 1000)
        const fine = 0
        const now = new Date()
        if (now > returnOff) {
            const late = Math.floor((now - returnOff) / (1000 * 60 * 60))
            fine = late * 10
        }
        details = {
            name: document.getElementById('book').value,
            takeOn: takeOn,
            returnOff: returnOff,
            fine: fine,
            status: 'active'
        }
        if (details) {
            let res = await axios.post('http://localhost:3000/books', details)
            details.id = res.data.id
            console.log(res.data)
            await displayDetails(details)
        }
    }
    catch (err) {
        console.log(err.message)
    }
    form.reset()

}
async function displayDetails(details) {
    try {
        let list = document.createElement('li')
        list.className = 'list bg-info p-2 rounded '
        list.innerHTML = ` <p>
        Book-Name: ${details.name}<br>
        Book-TakenOn: ${details.takeOn.toLocaleString()}<br>
        Book-ReturnDate: ${details.returnOff.toLocaleString()}<br>
        current-Fine: ${details.fine}<br>
        </p>`
        const Returnbtn = document.createElement('button')
        Returnbtn.className = 'return bg-warning border-0 rounded p-2 text-white'
        Returnbtn.textContent = 'Return'
        list.appendChild(Returnbtn)
        activeBooks.appendChild(list)

        Returnbtn.addEventListener('click', async () => {
            await returnFunction(details, list)
        })

    }
    catch (err) {
        console.log(err.message)
    }
}

async function returnFunction(details, list) {
    try {
        if (details.fine > 0) {
            const fineInput = document.createElement('input')
            fineInput.className = 'fine border-0 p-2 rounded'
            fineInput.value = details.fine
            let payBtn = document.createElement('button')
            payBtn.className = 'pay bg-success border-0 p-2 rounded'
            payBtn.textContent = 'pay'


            list.appendChild(fineInput)
            list.appendChild(payBtn)

            payBtn.addEventListener('click', async () => {
                returnBooks.appendChild(list)
                activeBooks.removeChild(list)
                await deletefunction(list)
            })

        }
        else {
            await axios.put(`http://localhost:3000/books/${details.id}`, { status: 'returned' })
            returnBooks.appendChild(list)
            activeBooks.removeChild(list)
            deletefunction(list, details)
        }
    }
    catch (err) {
        console.log(err.message)
    }
}

function deletefunction(list, details) {
    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'delete p-2 border-0 bg-danger rounded'
    deleteBtn.textContent = 'Delete'
    list.appendChild(deleteBtn)

    deleteBtn.addEventListener('click', async () => {
        try {

            await axios.delete(`http://localhost:3000/books/${details.id}`)
            returnBooks.removeChild(list)
        }
        catch (err) {
            console.log(err.message)
        }
    })
}

async function reload() {
    try {
        const res = await axios.get('http://localhost:3000/books')
        const books = res.data
        books.forEach(book => {
            if (book.status === 'active') {
                displayDetails(book)
            }
            else {
                let list = document.createElement('li')
                list.className = 'list bg-info p-2 rounded'
                list.innerHTML = `
            <p>
               Book-Name: ${book.name}<br>
               Book-TakenOn: ${new Date(book.takeOn).toLocaleString()}<br>
               Book-ReturnDate: ${new Date(book.returnOff).toLocaleString()}<br>
               Final-Fine: ${book.fine}<br>
            </p>
           `
                returnBooks.appendChild(list)
                deletefunction(list, book)
            }

        })
    }
    catch (err) {
        console.log(err.message)
    }
}