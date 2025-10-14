export default function CustomerAvatarFunc({firstname,lastname,size=100, bgColor="#450f3d",textColor='white', className="w-100 h-100"}){
    let  initials = "";
    const data = JSON.parse('{"A":1, "B":2 , "C":3, "D":4, "E":5, "F":6, "G":7, "H":8, "I":9, "J":10, "K":1, "L":2, "M":3, "N":4, "O":5, "P":6, "Q":7, "R":8, "S":9, "T":1, "U":2, "V":2, "W":3, "X":4, "Y":5, "Z":6}');
    if(firstname && lastname)   
    {
        initials = `${firstname[0].toUpperCase()} ${lastname[0].toUpperCase()}`
    }else{

        initials =firstname[0].toUpperCase() + firstname[1].toUpperCase();
        const first = "#43" + data[initials[1].toUpperCase().toString()] + "f3d";
        //console.log(first);
        //console.log(data[firstname[0].toUpperCase().toString()] + data[firstname[1].toUpperCase().toString()]);   
        bgColor = first;
    }
    const style = {
        width:'40px',
        height:'40px',
        backgroundColor:bgColor,
        color:textColor,
        borderRadius:"50%",
        display:"flex",
        justifyCotent:"center",
        alignItems:"center",    
        fontSize:size/8,
        fontWeight:"bold",
        userSelect:"none",
    }
    return(<>   
        <div style={style} className={className}>
            <div style={{ margin: 'auto auto', padding:0 }}>{initials}</div>
        </div>
    </>);
}