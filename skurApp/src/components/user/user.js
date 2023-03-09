import {
    Avatar, Box, Button, Container, Flex, Heading, Slider, WrapItem, Wrap, VStack, HStack, SliderTrack, Card,
    SliderFilledTrack,
    SliderThumb,
    SliderMark
} from "@chakra-ui/react";
import { React, useEffect, useState } from "react";
import './user.css';
import { MdEmail } from 'react-icons/md';
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { firestoreService } from '../../services/firebaseConfig';






function User() {

    const { uid } = useParams();
    const [userData, setUserData] = useState([])



    useEffect(() => {
        console.log('Hello from useEffect');


        const fetchData = async () => {
            try {
                await getDoc(doc(firestoreService, "users", uid)).then((snap) => {

                    setUserData(snap.data())

                })
            } catch (e) {
                console.log('ERROR ', e);

            }
        }

        fetchData();

    }, [uid])



    const [sliderValue, setSliderValue] = useState(50)

    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
    }

    return (
        <>
            <Card maxW="full" mt={0} centerContent overflow="hidden">
                <Flex>
                    <Box
                        borderRadius="lg"
                        h={600}
                        ml={50}                     
                    >
                        <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                            <WrapItem>
                                <VStack py={{ base: 5, sm: 5, md: 8, lg: 10 }} mt={30} >
                                    <HStack spacing="75px" mb={50}>
                                    <Avatar bg="blue.200" src={userData.photo}></Avatar>
                                    <Heading size='md'>{userData.name}</Heading>
                                    </HStack>
            
                                    {/* <Text mt={{ sm: 3, md: 3, lg: 5 }} color="white"></Text> */}
                                    <Button
                                        size="md"
                                        height="48px"
                                        width="200px"
                                        variant="ghost"
                                        _hover={{ border: '2px solid #1C6FEB' }}
                                        leftIcon={<MdEmail size="20px" />}>
                                        Email til bruker
                                    </Button>
                                </VStack>
                            </WrapItem>
                        </Wrap>
                        <Slider aria-label='slider-ex-6' onChange={(val) => setSliderValue(val)} min={1} max={5} colorScheme='green'>
                            <SliderMark
                                value={sliderValue}
                                textAlign='center'
                                color='white'
                                mt='-10'
                                ml='-5'
                                w='12'
                            >
                                {/* {sliderValue} HER LEGGER VI INN GJENNOMSNITT */}
                            </SliderMark>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                    </Box>
                </Flex>
            </Card>

            <Box id="userAdsAndHistory" maxW="full" mt={0} centerContent overflow="hidden" ml="10%">
                {/* <Card key={id} maxW='xs' padding="5%">
                        <CardBody>
                            <Image
                                src={imageLink}
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading id="toolTitle" size='md'>{data.toolName}</Heading>
                                <Text id="toolDescription">
                                    <b>Kategori:</b> {data.category}
                                </Text>
                                <Text id="toolDescription">
                                    {data.description}
                                </Text>
                                <Text id="toolPrice" color='blue.600' fontSize='2xl'>
                                    {data.price} kr
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button isDisabled={!signedIn} id="rentBtn" variant='solid' colorScheme='blue'>
                                    {buttonText}
                                </Button>
                                <Link isDisabled={!signedIn} href={"mailto:" + data.creatorEmail + "?subject=Angående din annonse på Skur: " + data.toolName} id="contactBtn" variant='ghost' colorScheme='blue'>
                                    Kontakt eier
                                </Link>
                            </ButtonGroup >
                        </CardFooter >
                    </Card >  */}

            </Box>
        </>


    );

}
export default User;