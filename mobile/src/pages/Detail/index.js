import React from 'react';

import { View, Image, TouchableOpacity, Text, Linking } from 'react-native';

import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';

import { useNavigation, useRoute } from '@react-navigation/native';

import LogoImg from '../../assets/logo.png';

import Styles from './styles';

export default function Detail() {
    const navigation = useNavigation();

    const route = useRoute();
    const incident = route.params.item;

    const message = `Olá ${incident.name}, quero ajudar o caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}`;

    function navigateBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        });
    }

    function sendWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return (
        <View style={Styles.container}>
            <View style={Styles.header}>
                <Image source={LogoImg} />
                
                <TouchableOpacity onPress={navigateBack}>
                    <Feather 
                        name="arrow-left" 
                        size={28} 
                        color="#E02041"
                    />
                </TouchableOpacity>
            </View>

            <View style={Styles.incident}>
                <Text style={[Styles.incidentProperty, { marginTop: 0 }]}>
                    ONG:
                </Text>
                <Text style={Styles.incidentValue}>
                    {incident.name} de {incident.city}/{incident.uf}
                </Text>

                <Text style={Styles.incidentProperty}>
                    CASO:
                </Text>
                <Text style={Styles.incidentValue}>
                    {incident.title}
                </Text>

                <Text style={Styles.incidentProperty}>
                    VALOR:
                </Text>
                <Text style={Styles.incidentValue}>
                    {Intl.NumberFormat('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                    }).format(incident.value)}
                </Text>
            </View>

            <View style={Styles.contactBox}>
                <Text style={Styles.heroTitle}>
                    Salve o dia!
                </Text>
                <Text style={Styles.heroTitle}>
                    Seja o herói desse caso.
                </Text>

                <Text style={Styles.heroDescription}>
                    Entre em contato:
                </Text>

                <View style={Styles.actions}>
                    <TouchableOpacity 
                        style={Styles.action} 
                        onPress={sendWhatsApp}>
                        <Text style={Styles.actionText} >
                            WhatsApp
                        </Text>               
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={Styles.action} 
                        onPress={sendMail}>
                        <Text style={Styles.actionText} >
                            E-mail
                        </Text>               
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}