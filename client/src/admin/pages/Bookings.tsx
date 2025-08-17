


const Bookings = () => {
    return (
       <div className="w-full h-full">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl">All Bookings</h1>

             <button
            className="w-fit px-4 py-2 rounded-lg text-xs bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white transition"
          >
            New Booking
          </button>
        </div>

        <div className="mt-10 w-full">
            <table className="w-full [&>*>tr>td]:text-xs [&>*>tr>th]:text-sm">
                <thead>
                    <tr className="[&>th]:border [&>th]:border-neutral-400 [&>th]:py-3">
                        <th>Name</th>
                        <th>Movies</th>
                        <th>Booking Info</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Transaction ID</th>
                    </tr>
                </thead>


                <tbody>
                    <tr className="[&>td]:border [&>td]:border-neutral-400 [&>td]:py-5 [&>td]:text-center">
                        <td>Ronak</td>
                        <td>Avengers: Endgame, Breaking Bad</td>
                        <td>Audi 1, 17 Aug, 9:15 AM to 12:15 PM</td>
                        <td>10 Aug, 2025</td>
                        <td>2000</td>
                        <td>Egagea93ha4h44ha</td>
                    </tr>

                    <tr className="[&>td]:border [&>td]:border-neutral-400 [&>td]:py-5 [&>td]:text-center">
                        <td>Ronak</td>
                        <td>Avengers: Endgame, Breaking Bad</td>
                        <td>Audi 1, 17 Aug, 9:15 AM to 12:15 PM</td>
                        <td>10 Aug, 2025</td>
                        <td>2000</td>
                        <td>Egagea93ha4h44ha</td>
                    </tr>

                    <tr className="[&>td]:border [&>td]:border-neutral-400 [&>td]:py-3 [&>td]:text-center">
                        <td>Ronak</td>
                        <td>Avengers: Endgame, Breaking Bad</td>
                        <td>Audi 1, 17 Aug, 9:15 AM to 12:15 PM</td>
                        <td>10 Aug, 2025</td>
                        <td>2000</td>
                        <td>Egagea93ha4h44ha</td>
                    </tr>
                </tbody>
            </table>
        </div>
       </div>
    )
}


export default Bookings;