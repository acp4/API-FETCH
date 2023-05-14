const getUsers = () => {
    document.getElementById("spinner").style.display = "block";
    const infoGuar = localStorage.getItem("infUsers");
    const currentTime = new Date();
    if (infoGuar) {
      const inflocal = JSON.parse(infoGuar);
      const tiempoGuar = new Date(inflocal.timestamp);
      const difeTiem = currentTime.getTime() - tiempoGuar.getTime();
      const Milisegundos = 60000;
  
      if (difeTiem <= Milisegundos) {
        displayinfUsers(inflocal.data);
        document.getElementById("spinner").style.display = "none";
        document.getElementById("cards-container").style.display="inline";
        return;
      }
    }
   
    const url = "https://reqres.in/api/users?delay=3";
 
   fetch(url)
     .then(response => {
       return response.json();
     })
     .then((usersObj) => {
       const inf = {
         data: usersObj.data,
         timestamp: currentTime.getTime()
       };
       localStorage.setItem("infUsers", JSON.stringify(inf));
       displayinfUsers(usersObj.data);
       console.log("Data loaded from API.");
     })
     .catch(error => console.log(error))
     .finally(() => {
       document.getElementById("spinner").style.display = "none";
       document.getElementById("cards-container").style.display="inline";

     });
 };
 
 const displayinfUsers = (userData) => {
   for (let i = 0; i < 6; i++) {
     document.getElementById("first-name" + (i + 1)).innerHTML = userData[i].first_name;
     document.getElementById("email" + (i + 1)).innerHTML = `Email: ${userData[i].email}`; 
     document.getElementById("ident" + (i + 1)).innerHTML = `ID:    ${userData[i].id}`;
     document.getElementById("last" + (i + 1)).innerHTML = userData[i].last_name;
     document.getElementById("avatar" + (i + 1)).src = "https://reqres.in/img/faces/" + [i + 1] + "-image.jpg";
   }
 };

 document.getElementById("spinner").style.display = "inline";
 getUsers(); 