export async function readPdf(file) {

    const formData = new FormData();
    formData.append('pdf_file', file);

    let data = await fetch("http://localhost:8000/readpdf", {
        method: "POST",
        body: formData,
        credentials: 'include',
    });

    let body = await data.clone().json();

    const subjects = Object.values(body[Object.keys(body)[0]]).slice(1);
    const codes = Object.values(body[Object.keys(body)[1]]).slice(1);
    const marks = Object.values(body[Object.keys(body)[2]]).slice(1);

    const result = subjects.map((subject, index) => {
        return {
            "subject": subject,
            "subject code": codes[index],
            "marks": parseInt(marks[index])
        };
    });

    // console.log(result);
    return result;
}