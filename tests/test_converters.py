from vapor_bot.utils import converters
import vapor_bot.utils.converters as converters


def test_convertIntToHex():
    test = converters.convertIntToHex(20)
    assert test == "0x14"
