import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoImage: {
    width: 150,
    height: 147,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontFamily: 'LexendSemiBold',
    
    color: '#1B2C46',
    marginBottom: 30,
    
  },
  input: {
    width: '100%',
    height:60,
    backgroundColor: '#F8F9F9',
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3.5 },
    shadowOpacity: 0.21,    
    elevation: 3,
  },
  button: {
    width: '100%',
    backgroundColor: '#1B2C46', 
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding:18,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'LexendSemiBold',
    fontWeight: '800',
  },
  placeholder: {
    width:"97.5%",    
    color: '#1B2C46',
    fontFamily: 'LexendRegular',
  },
  questionStatement: {
    backgroundColor: "#DFE8F4",
    padding: '10%',
    borderRadius: 15,
    textAlign:'center',
    fontFamily: 'LexendSemiBold',
  },
  questionText: {
    fontFamily: 'LexendSemiBold',
    fontWeight: 700,
    fontSize: 17,
    textAlign: 'center'
   },
  answersQuestion: {
    
    gap: 11, 
    backgroundColor: '#F8F9F9',
    padding: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3.5 },
    shadowOpacity: 0.21,    
    elevation: 6,
    marginBottom: 20,
  },
  answersQuestionText: {
    fontFamily: 'LexendRegular',
    textAlign: 'center',
    fontSize: 15,
    color: '#3A3F48',
  },
});

export default styles;
