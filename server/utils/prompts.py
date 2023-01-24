
# Python
def generate_prompt_python(function):
    prompt = """Suggest function description for the function.
Example:
Code language: Python
Code: def test_function(p1, p2, p3):
Description:
Use ``def test_function(p1, p2, p3)`` to do something.
    
Parameters
----------
SIZE: int 
    Size of the matrix
p1 : int
    describe about parameter p1
p2 : float 
    describe about parameter p2
p3 : type
    describe about parameter p3

Returns
----------
variable: type
    describe what it returns

Example:
Code language: Python
Code: def add_numbers(num1, num2):
    sum = num1 + num2
    print('Sum: ',sum)
Description:
Use ``add_numbers(num1, num2)`` to add two numbers.
    
Parameters
----------
num1 : int 
    First number
num2 : int
    Second number
    
Returns
----------
sum : int
    Result of addition of num1 and num2

Example:
Code language: Python    
Code: def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "word",
        help="the word to be searched for in the text file."
    )
    parser.add_argument(
        "filename",
        help="the path to the text file to be searched through"
    )
Description:
Use ``main()`` to parse arguments via the parser variable. These
arguments will be defined by the user on the console.  This will pass
the word argument the user wants to parse along with the filename the
user wants to use, and also provide help text if the user does not
correctly pass the arguments.

Example:
Code language: Python
Code: def dynamic_k_matching(self, cost, pair_wise_ious, gt_classes, num_gt, fg_mask):
    # Dynamic K
    # ---------------------------------------------------------------
    matching_matrix = torch.zeros_like(cost, dtype=torch.uint8)

    ious_in_boxes_matrix = pair_wise_ious
    n_candidate_k = min(10, ious_in_boxes_matrix.size(1))
    topk_ious, _ = torch.topk(ious_in_boxes_matrix, n_candidate_k, dim=1)
    dynamic_ks = torch.clamp(topk_ious.sum(1).int(), min=1)
    dynamic_ks = dynamic_ks.tolist()
    for gt_idx in range(num_gt):
        _, pos_idx = torch.topk(
            cost[gt_idx], k=dynamic_ks[gt_idx], largest=False
        )
        matching_matrix[gt_idx][pos_idx] = 1

    del topk_ious, dynamic_ks, pos_idx

    anchor_matching_gt = matching_matrix.sum(0)
    if (anchor_matching_gt > 1).sum() > 0:
        _, cost_argmin = torch.min(cost[:, anchor_matching_gt > 1], dim=0)
        matching_matrix[:, anchor_matching_gt > 1] *= 0
        matching_matrix[cost_argmin, anchor_matching_gt > 1] = 1
    fg_mask_inboxes = matching_matrix.sum(0) > 0
    num_fg = fg_mask_inboxes.sum().item()

    fg_mask[fg_mask.clone()] = fg_mask_inboxes

    matched_gt_inds = matching_matrix[:, fg_mask_inboxes].argmax(0)
    gt_matched_classes = gt_classes[matched_gt_inds]

    pred_ious_this_matching = (matching_matrix * pair_wise_ious).sum(0)[
        fg_mask_inboxes
    ]
    return num_fg, gt_matched_classes, pred_ious_this_matching, 
Description:
Use ``dynamic_k_matching(self, cost, pair_wise_ious, gt_classes, num_gt, fg_mask)`` to perform dynamic K matching.

Parameters
----------
self : object
    the object instance of the class
cost : torch.Tensor
    cost matrix
pair_wise_ious : torch.Tensor
    pairwise IoUs between anchors and ground truth boxes
gt_classes : torch.Tensor
    ground truth classes
num_gt : int
    number of ground truth boxes
fg_mask : torch.Tensor
    foreground mask

Returns
----------
num_fg : int
    number of foreground anchors
gt_matched_classes : torch.Tensor
    ground truth classes of matched anchors
pred_ious_this_matching : torch.Tensor
    IoUs of matched anchors

Example:
Code language: Python
Code: 
class Vehicle(object):

    def __init__(self, arg, *args, **kwargs):
        self.arg = arg
Description:
The Vehicle object contains lots of vehicles

Parameters
----------
arg : str
    The arg is used for ...
*args : str
    The variable arguments are used for ...
**kwargs : str
    The keyword arguments are used for ...

Attributes
----------
arg : str
    This is where we store arg

Generated prompt:
Code language: Python
Description:: 
{}
Code: """ + function +"""
""".format(function.capitalize())
    return prompt

# C/C++


def generate_prompt_c(function):
    prompt = """Suggest header for the function.
Description:
Code language: C/C++
Code: 
void test_function(p1, p2, p3)
Description::    
/** @brief Does something.
 *
 *  @param p1 Describe about parameter p1.
 *  @param p2 Describe about parameter p2.
 *  @param p3 Describe about parameter p3.
 *  @return Describe what it returns. */

Example:
Code language: C/C++
Code: 
int add_numbers(int num1, int num2)
{
    int sum = num1 + num2;
    return sum;
}
Description:
/** @brief Adds two numbers.
 *
 *  @param num1 First number.
 *  @param num2 Second number.
 *  @return Result of addition of num1 and num2. */

Example:
Code language: C/C++
Code:
void sum_of_two_numbers(int num1, int num2)
{
    int sum = num1 + num2;
}

Description:
/** @brief Adds two numbers.
 *
 *  @param num1 First number.
 *  @param num2 Second number.
 *  @return None */

Generated prompt:
Code language: C/C++
Description: 
{}
Code: """ + function + """
""".format(function.capitalize())
    return prompt


# JavaScript
def generate_prompt_js(function):
    prompt = """Suggest header for the function.
Description:
Code language: JavaScript
Code:
function calculateArea(length, width, area) {
	area = length * width;
	return area;
}
Description:
/**
 * function to  calculate the area of a rectangle
 * @param {number} length - The length of the rectangle
 * @param {number} width - The width of the rectangle
 * @returns {number} - The area of the rectangle
 */

Example:
Code language: JavaScript
Code:
const programmingLanguage = {
	id: 100,
	name: "Javascript",
	software: "Websites",
	year: 1999,
};
Description:
/**
 * Custom data type defining a programming language
 * @typedef {Object} ProgrammingLanguage
 * @property {number} id - Language id
 * @property {string} name - Language name
 * @property {string} software - Projects it can build
 * @property {number} year - the year it came to life
 */

/**
 * @type {ProgrammingLanguage}
 */

Example:    
Code language: JavaScript
Code:

class User {
	constructor(userInfo) {
		this.name = userInfo.name;


		this.password = userInfo.password;


		this.email = userInfo.email;


		this.age = userInfo.age;
	}
}
Description:
/**
 * Class to create a user object
 */
/**
 * @property {string} name - User name
 */
/**
 * @property {string} password - User's password
 */
/**
 * @property {string} email - User's email address
 */
/**
 * @property {number} age - User's age
 */

Generated prompt:
Code language: JavaScript
Description: 
{}
Code: """ + function + """
""".format(function.capitalize())
    return prompt


def generate_prompt_swift(function):
    prompt = """Suggest header for the function.
Description:
Code language: Swift
Code:
func greeting(to recipient: String) throws -> String {
    guard recipient != "Derek" else {
        throw MyError.invalidRecipient
    }

    return "Greetings, \(recipient)!"
}
Description:
/**
Creates a personalized greeting for a recipient.

- Parameter: 
    - recipient: The person being greeted.

- Throws: `MyError.invalidRecipient`
        if `recipient` is "Derek".

- Returns: A new string saying hello to `recipient`.
*/

Example:
Code language: Swift
Code:
func magnitude3D(x: Double, y: Double, z: Double) -> Double {
    return sqrt(pow(x, 2) + pow(y, 2) + pow(z, 2))
}
Description:
/**
Calculates the magnitude of a 3D vector.

- Parameters:
    - x: The x component of the vector.
    - y: The y component of the vector.
    - z: The z component of the vector.

- Returns: The magnitude of the vector.
*/

Generated prompt:
Code language: Swift
Description: 
{}
Code: """ + function + """
""".format(function.capitalize())
    return prompt
