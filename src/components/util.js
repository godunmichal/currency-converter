export const sortData = (data) =>{
    const sortedData = [...data];
    return sortedData.sort((a,b) => (a > b ? 1 : -1));
}