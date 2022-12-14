import mongoose, {Schema} from "mongoose"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//스키마 작성
const UserSchema = new Schema({
  username: String,
  hashedPassword: String
})


//인스턴스 메서드
//인스턴스에서의 this => 문서 인스턴스를 가르킴
UserSchema.methods.setPassword = async function(password) {
  const hash = await bcrypt.hash(password, 10)
  this.hashedPassword = hash
}
UserSchema.methods.checkPassword = async function(password) {
  const result = await bcrypt.compare(password, this.hashedPassword)
  return result //true / false
}
UserSchema.methods.serialize = function() {
  //응답데이터에서 hashedPassword 제거
  const data = this.toJSON()
  delete data.hashedPassword
  return data
}
UserSchema.methods.generateToken = function() {
  const token = jwt.sign(
    {
      _id: this.id,
      username: this.username
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d'
    }
  )
  return token
}

//스태틱 메서드 : 모델에서 바로 사용할 수 있는 함수
//스태틱 함수에서의 this => 모델을 가르키기때문에 User를 가르킴
UserSchema.statics.findByUsername = function(username) {
  return this.findOne({username})
}



//모델 생성
//mongoose.model(스키마 이름, 해당 스키마 객체)
const User = mongoose.model('User', UserSchema)
export default User
