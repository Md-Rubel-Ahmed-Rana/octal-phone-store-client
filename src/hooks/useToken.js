
const useToken = () => {
    const handleToken = (email) => {
            fetch(`http://localhost:5000/jwt?email=${email}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.accessToken) {
                    localStorage.setItem("accessToken", data.accessToken);
                }
            })
    }

    return handleToken
};

export default useToken;