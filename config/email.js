import nodemailer from "nodemailer";


export const smtpTransport = nodemailer.createTransport({
    pool : true, //이게 커넥션 풀
    maxConnections: 1, // 여러개 연결 못하게 하고 우선 한개만
    service : "naver", 
    host: "smtp.naver.com",
    prot : 465, //이거는 네이버 메일 한경설정 들어가서 사용하는 사람의 포트번호 작성하면 된다
    secure : false, // 보안연결임 true로 하면 보안연결된다
    requireTLS : true, 
    auth : {
        user: "rhksgh1222@naver.com", // 개인 네이버아이디 @ naver.com
        pass : "Gwanhoj931!" //개인 네이버 비밀번호
    },
    tls : {
        rejectUnauthorized : false 
    }
});



var generateRandomNumber = function (min,max) {
    var randNum = Math.floor(Math.random() * (max - min +1)) + min;

    return randNum;
}


export const emailAuth = async(req,res) => {
    const number = generateRandomNumber(111111, 999999)

    const { email } = req.body; //사용자가 입력한 이메일

    const mailOptions = {
        from : "bik1111@naver.com ", // 발신자 이메일 주소.
        to : email, //사용자가 입력한 이메일 -> 목적지 주소 이메일
        subject : " 인증 관련 메일 입니다. ",
        html : '<h1>인증번호를 입력해주세요 \n\n\n\n\n\n</h1>' + number
    }
    smtpTransport.sendMail(mailOptions, (err, response) => {
        console.log("response", response);
        //첫번째 인자는 위에서 설정한 mailOption을 넣어주고 두번째 인자로는 콜백함수.
        if(err) {
            res.json({ok : false , msg : ' 메일 전송에 실패하였습니다. '})
            smtpTransport.close() //전송종료
            return
        } else {
            res.json({ok: true, msg: ' 메일 전송에 성공하였습니다. ', authNum : number})
            smtpTransport.close() //전송종료
            return 

        }
    })
}


// POP 서버명 : pop.naver.comSMTP 서버명 : smtp.naver.com
// 포트 정보
// POP 포트 : 995, 보안연결(SSL) 필요SMTP 포트 : 465, 보안 연결(SSL) 필요

//이거 qkrrn0315@naver.com 계정 환경설정
