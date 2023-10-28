export default function Login() {
  return (
      <div className="relative flex top-0 left-0 w-screen h-screen">
        <video
          id="background-video"
          loop
          autoPlay
          muted
          className="w-full h-full object-cover z-0"
        >
          <source src="guitarguitar.mp4" type="video/mp4" />
        </video>
        <div className="absolute w-full h-full inset-0 bg-black bg-opacity-70 z-10" />
        <div className="absolute flex justify-center items-center w-screen h-screen top-0 left-0 z-20">
          <div className="flex flex-col items-center justify-center bg-white text-black p-20 rounded-3xl">
          <div className="max-w-md mx-auto">
				<div>
					<h1 className="text-2xl text-center font-semibold">Login</h1>
				</div>
				<div className="divide-y divide-gray-200">
					<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
						<div className="relative">
							<input autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
							<label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
						</div>
						<div className="relative">
							<input autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
							<label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
						</div>
						<div className="relative mx-auto">
							<button className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
						</div>
					</div>
				</div>
			</div>
        </div>
      </div>

    </div>

  )
}
