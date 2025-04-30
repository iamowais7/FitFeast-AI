import { View, Text, Image, Alert, FlatList } from 'react-native';
import React, { useContext, useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/shared/Button';
import { Link } from 'expo-router';
import { auth } from '../../services/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { UserContext } from '../../context/UserContext';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useContext(UserContext);
  const createNewUser = useMutation(api.Users.CreateNewUser);

  const onSignUp = () => {
    if (!name || !email || !password) {
      Alert.alert('Missing Fields!', 'Enter All Field Values');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        if (user) {
          const result = await createNewUser({
            name,
            email,
          });
          setUser(result);
        }
      })
      .catch((error) => {
        Alert.alert('Signup Failed', error.message);
      });
  };

  const formItems = [
    { key: 'logo', render: () => (
        <Image source={require('./../../assets/images/logo-f2.png')} style={{ width: 150, height: 150, marginTop: 60, alignSelf: 'center' }} />
      )
    },
    { key: 'heading', render: () => (
        <Text style={{ fontSize: 35, fontWeight: 'bold', textAlign: 'center' }}>Create New Account</Text>
      )
    },
    { key: 'name', render: () => <Input placeholder={'Full Name'} onChangeText={setName} /> },
    { key: 'email', render: () => <Input placeholder={'Email'} onChangeText={setEmail} /> },
    { key: 'password', render: () => <Input placeholder={'Password'} password={true} onChangeText={setPassword} /> },
    { key: 'button', render: () => <Button title={'Create Account'} onPress={onSignUp} /> },
    { key: 'footerText', render: () => (
        <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 15 }}>Already have an account?</Text>
      )
    },
    { key: 'signInLink', render: () => (
        <Link href={'/auth/SignIn'}>
          <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 5, fontWeight: 'bold' }}>Sign In here</Text>
        </Link>
      )
    },
  ];

  return (
    <FlatList
      contentContainerStyle={{ padding: 20 }}
      data={formItems}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 15 }}>
          {item.render()}
        </View>
      )}
    />
  );
}
