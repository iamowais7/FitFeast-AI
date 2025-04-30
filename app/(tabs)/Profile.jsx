import { View, Text, Platform, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { AnalyticsUpIcon, CookBookIcon, Login03Icon, ServingFoodIcon } from '@hugeicons/core-free-icons'
import { UserContext } from './../../context/UserContext'
import Colors from './../../shared/Colors'
import { HugeiconsIcon } from '@hugeicons/react-native'
import { useRouter } from 'expo-router'
import { auth } from './../../services/FirebaseConfig'
import { signOut } from 'firebase/auth'

const menuOptions = [
  {
    title: 'My Progress',
    icon: AnalyticsUpIcon,
    path: '/(tabs)/Progress'
  },
  {
    title: 'Explore Recipes',
    icon: CookBookIcon,
    path: '/(tabs)/Meals'
  },
  {
    title: 'Ai Recipes',
    icon: ServingFoodIcon,
    path: '/generate-ai-recipe'
  },
  {
    title: 'Logout',
    icon: Login03Icon,
    path: 'logout'
  }
];

export default function Profile() {
  const { user, setUser } = useContext(UserContext)
  const router = useRouter()

  const onMenuOptionClick = (menu) => {
    if (menu.path == 'logout') {
      signOut(auth).then(() => {
        console.log("SIGN OUT !!")
        setUser(null)
        router.replace('/')
      })
      return;
    }
    router.push(menu?.path)
  }

  return (
    <View style={styles.container}>
                       {/* Top Section */}
      <View>
        <Text style={styles.heading}>Profile</Text>

        <View style={styles.profileSection}>
          <Image source={require('./../../assets/images/user.png')}
            style={styles.profileImage} />
          <Text style={styles.nameText}>{user?.name}</Text>
          <Text style={styles.emailText}>{user?.email}</Text>
        </View>

        <FlatList
          data={menuOptions}
          style={styles.menuList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onMenuOptionClick(item)}
              style={styles.menuItem}>
              <HugeiconsIcon icon={item.icon} size={30} color={Colors.PRIMARY} />
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

                       {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.copyText}>
          © {new Date().getFullYear()} Elixir® All rights reserved.
        </Text>
        <Text style={styles.designText}>
          Designed & Developed by <Text style={styles.developerName}>Owais Khan</Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: Platform?.OS == 'ios' ? 40 : 25,
    justifyContent: 'space-between', // important to push footer down
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  profileSection: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 99,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  emailText: {
    fontSize: 16,
    color: Colors.GRAY,
    marginTop: 5,
  },
  menuList: {
    marginTop: 20,
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    padding: 15,
    borderWidth: 0.2,
    marginTop: 5,
    borderRadius: 15,
    backgroundColor: Colors.WHITE,
    elevation: 1,
  },
  menuText: {
    fontSize: 20,
    fontWeight: '300',
  },
  footer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  copyText: {
    color: '#6B7280',
    fontSize: 12,
  },
  designText: {
    color: '#6B7280',
    fontSize: 10,
    marginTop: 4,
  },
  developerName: {
    fontWeight: '600',
    color: '#4B5563',
  },
});
