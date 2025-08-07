import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

    const {setShowLogin, axios , setToken, navigate } = useAppContext();
    const [loading, setLoading] = React.useState(false);
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    // React.useEffect(() => {
    //     console.log("Updated loading state:", loading);
    // }, [loading]);
    const onSubmitHandler = async(event) =>{
        event.preventDefault();
        if(loading) return;
        //console.log(loading);
        setLoading(true);
        if(state === "login" && (!email || !password)){
            toast.error("Please fill all fields");
            setLoading(false);
            return;
        }
        if(state === "register" && (!name || !email || !password)){
            toast.error("Please fill all fields");
            setLoading(false);
            return;
        }
        
        setTimeout(async () => {
            try{
                
                const { data } = await axios.post(`/api/user/${state}`, {name, email, password})
                console.log(data);
                
                if(data.success){
                    navigate('/');
                    setToken(data.token);
                    localStorage.setItem('token',data.token )
                    setShowLogin(false)
                } else{
                    toast.error(data.message)
                }
            }catch(error){
                toast.error(error.message)
            }finally{
                setLoading(false);
            }
        }, 2000);
       
    }

  return (
    <div onClick={() => setShowLogin(false)} className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm text-sm text-gray-600">

         <form onSubmit={onSubmitHandler} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" required />
            </div>
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
                </p>
            )}
            <button 
                disabled={loading}
                className="bg-indigo-500 hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                {loading ? 'Logging in...' : state === "register" ? "Create Account" : "Login"}
            </button>
        </form>
    </div>
  )
}

export default Login