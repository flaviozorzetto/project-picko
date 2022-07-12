import {
	getFirestore,
	collection,
	getDocs,
	getDoc,
	doc,
	setDoc,
} from 'firebase/firestore';
import app from '../../firebase.js';
const db = getFirestore(app);

async function getInterviews() {
	// const querySnapshot = await getDocs(collection(db, 'interviews'));
	const querySnapshot = await getDocs(collection(db, 'interview_user'));

	for (let i = 0; i < querySnapshot.docs.length; i++) {
		const data = querySnapshot.docs[i].data();

		console.log(data);
		console.log(await (await getDoc(data.user)).data());
	}

	return querySnapshot;
}

async function createUserDocument(userInfo) {
	const { firstName, lastName, email, companyName, jobRole, uid } = userInfo;

	const docRef = doc(db, 'users', uid);

	const data = {
		firstName,
		lastName,
		companyName,
		jobRole,
		email,
	};

	try {
		console.log('Trying to create user doc');
		await setDoc(docRef, data);
		console.log('Finished creating user doc');
	} catch (error) {
		console.log(error);
	}
}

async function queryUser(uid) {
	const docRef = doc(db, 'users', uid);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return { docRef, data: docSnap.data() };
	} else {
		return 'No data found!';
	}
}

async function getCompetencies() {
	const axisSnapshot = await getDocs(collection(db, 'axis'));
	const competencies = {};

	for (let a = 0; a < axisSnapshot.docs.length; a++) {
		const axisDocRef = axisSnapshot.docs[a];
		const axisData = axisDocRef.data();
		const axisDocTitle = axisDocRef.id;
		competencies[axisDocTitle] = {};

		for (let b = 0; b < axisData.competences.length; b++) {
			const competenceDocRef = await getDoc(axisData.competences[b]);
			const competenceData = await competenceDocRef.data();
			const competenceDocTitle = competenceDocRef.id;
			competencies[axisDocTitle][competenceDocTitle] = {};
			competencies[axisDocTitle][competenceDocTitle]['description'] =
				competenceData.description;
			competencies[axisDocTitle][competenceDocTitle]['levels'] = {};

			if (competenceData.levels) {
				for (let c = 0; c < competenceData.levels.length; c++) {
					const levelDocRef = await getDoc(competenceData.levels[c]);
					const levelData = await levelDocRef.data();
					competencies[axisDocTitle][competenceDocTitle]['levels'][
						levelDocRef.id
					] = levelData;
				}
			}
		}
	}

	return competencies;
}

export { getInterviews, createUserDocument, queryUser, getCompetencies };
