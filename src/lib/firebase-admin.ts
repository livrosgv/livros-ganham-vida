// 📁 src/lib/firebase-admin.ts
import { cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp, getApps } from 'firebase-admin/app'

const firebaseAdminConfig = {
  credential: cert({
    projectId: 'livros-gv',
    clientEmail: "firebase-adminsdk-fbsvc@livros-gv.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCf2GizJk1yMvHr\nW+L8dki55HfJbihGO5LaGB0SnsgYs9ACx0O3piSWNCtEVPST+HrqBEy0MEqi0ENA\n3mVnOqL0FvAehZKZHjeSQb4mVBqxPY+CVSOhDHyxesPGaF+rT6VAJY/K4PC+OAlZ\n03W6lkFGkZyV5zAbXqq3WRbyJ6DsPyDnZNZMsafyaV8X+7bJ8gKP35AdqRmIjAut\nblGCVIZSJ3z6wUT68aGYPHbvkZE+yoNE/FkL8KkLemCLri/AGpls8CZE/f5kmuuU\n1SlI0McJ6UaLwmS9OR1fi2k2+VwkJ90FQRBfa3Vf1E/OXt88jDQoZlTfUtKna9c6\nHZTb8aChAgMBAAECggEAKIgNdG/f73cvlMiF9BJiOpDONwtxtu1gPWEj7hbJEkp2\nEl5Is4azfEraNcd9BRBayoAwmvgr1MEObKJ4AAcETvSKCpNAKwdYfAOjncBxzEOZ\n4iiIkkvCSpagkezhZWUat/tOTNlg8jrvVBGkpp13C9fcZr5qmmYUz80NXnXh/kVU\nltvDP3zW1veUJt676UPW+gmJwiZDTNiy6PZqYkC+/1KBCzE9H2hxfXc7U9EX2cCO\n3n43Jkpgr/v1lJDY94LBRCbC9f7rtv6Jta89E1b3B4Y8t0kLalxrRiz562QY8NiM\nsGZM4o9VBNKCAgtcmw/1YlarGldAcSHl0Mysmj5uKQKBgQDe17NzGJKXxqW/YY3R\nB0IwFOkUFRoitWCzy2YvzDUdELpZusAW4CDz7ya67mcEE8rHa/h7HjL7ET5s9zqL\nMc/3ZmuIdyr8iaH9evI049YNFc5JsQhdanc7+QxQ2XeIWCvpzL/Z1g3QC5gBvTvG\nOFmBnQqaca1YsPZGAuMvBrYqLwKBgQC3oRRouunhT93y/Ctd43jyJ6UOkgg9m+1T\nmwZyfB715uoRA+PYGqr0AEQXVwbws7JMe/utTYFuWW1Q1WR90npwIVKAlaDyDRin\nS+BivzC7Bjukf6/Zu9JmdZ7MEvpCJMFrFnHJy4Lur2jX5vfMuXHCMPYIfDbLgsM5\nfTCj5p++LwKBgAzcGcj8lAkaN5pxwMNdTd6EdmboSNfT6760cDM176K7wmVHN6qa\nSIyLMor7EwrTMZKMkoxYU8zVU+rp4YEC4OOAD5iSd/KW5rhADhYrR8D9jygFhVwO\nts7JMoK/6fv+Spp1bGTfy3BEGwOOrhJkUhX+wAvln4FMxQmJRR8DniOVAoGBAIZ7\nFXNN0BMOZsGZJDlyahUOK7dsA1T7aOed1S7q79Gu9yTW8HpHrYNc3oEpXw/Qyndx\nJXRaGrwyCfj1Ds+G4dxUyxMYgfJC3RdIXmBzHMEbY3qpeKPBBem7ojxaeaUPPger\nPFJJFO6wz9uubzQja8iICudT8N1COq9Tm9etArhJAoGBAMN0Z6yAs++dGd+xOpjm\nYLjLP2v1TQj1IP8kNevhunYMrvItJ3sQzKTqD4otxho6XHPV/UFb9lIqEHu5byVQ\n8uX6hdoW0d5DEfty153GwjvBu9RcWRIJ0P09dk93Iru3RAScl5FuNacRiXtSG+Hs\nPWrdgMYGGyXWVXjl9V1JArbc\n-----END PRIVATE KEY-----\n",
  }),
}

const app = !getApps().length ? initializeApp(firebaseAdminConfig) : getApps()[0]
const db = getFirestore(app)

export { db }
