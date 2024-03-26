const Wrapper = () => {

    useEffect(() => {
        //TODO - add hosting URL for data fetch
        const url = "";

    const fetchData = async () => {
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            console.log(json);
            dispatch({type: OrderActionKind.UPDATE, types: json});
        } catch (error) {
            console.log("error", error);
        }
    };
    fetchData();
}, []);

return (<TotalContext.Provider value={{ state, dispatch }}>
    <div>
        <ListContainer orderTypes={state.types}></ListContainer>
        <TotalBox></TotalBox>
    </div>
</TotalContext.Provider>
);
};

export default Wrapper;