def generate_prompt_explain(function):
    prompt = """Describe the code with bullet points.
Example:
Code: def test_function(p1, p2, p3):
Description:
Use def test_function(p1, p2, p3) to do something.

Example:
Code language: Python
Code: def add_numbers(num1, num2):
    sum = num1 + num2
    print('Sum: ',sum)
Description:
Use add_numbers(num1, num2) to add two numbers.   
1. Add num1 and num2.
2. Print the sum.

Example: 
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
1. The main() function is defined and argparse.ArgumentParser() is used to create an ArgumentParser object which will hold all the information necessary to parse the command-line arguments.
2. parser.add_argument("word", help="the word to be searched for in the text file.") is used to add an argument for the word that will be searched for in the text file. The help parameter is used to specify a short description of the argument that will be displayed when the user runs the script with the -h or --help option.
3. parser.add_argument("filename", help="the path to the text file to be searched through") is used to add an argument for the path to the text file that will be searched through. The help parameter is used to specify a short description of the argument that will be displayed when the user runs the script with the -h or --help option.

Example:
Code:
async function fetchUserData(userId, accessToken, includeProfilePicture = true) {
  try {
    const response = await fetch(`https://example.com/users/$userId`, {
      headers: {
        Authorization: `Bearer $accessToken`
      }
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    const { name, email, age } = data;
    let userData = {
      name,
      email,
      age,
    };

    if (includeProfilePicture) {
        const profilePictureResponse = await fetch(
          `https://example.com/users/${userId}/profile-picture`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        const profilePictureBlob = await profilePictureResponse.blob();
        const profilePictureUrl = URL.createObjectURL(profilePictureBlob);
        userData.profilePictureUrl = profilePictureUrl;
    }

    return userData;
  } catch (error) {
    console.error(`An error occurred while fetching user data: ${error.message}`);
    throw error;
  }
}

Description:
1. fetchUserData is an asynchronous function that takes in three arguments: userId, accessToken, and includeProfilePicture.
2. The function uses the fetch API to make a GET request to an endpoint at https://example.com/users/$userId
3. The request includes an Authorization header with a value of Bearer $accessToken. This is probably used for authentication.
4. The response is parsed as JSON and stored in the data variable.
5.If the response is not ok (i.e. the request failed), the function throws an error with the message in the data object.
6.The name, email, and age properties of the data object are destructured and stored in an object called userData.
7. If includeProfilePicture is true, the function makes another GET request to https://example.com/users/$userId/profile-picture with the same Authorization header as before, this time expecting a BLOB file.
8. The BLOB file is then converted to a URL and stored in a property called profilePictureUrl in the userData object.
9. The userData object is returned
10. If an error is caught, the error message is logged to the console and the error is rethrown.

Example:
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
1. dynamic_k_matching is a method of a class, as it starts with self as the first argument.
2. cost, pair_wise_ious, gt_classes, num_gt, and fg_mask are all input variables for the method.
3. matching_matrix is created as a matrix of zeroes with the same shape as the cost variable, with data type of torch.uint8.
4. ious_in_boxes_matrix is a variable that is assigned the value of pair_wise_ious
5. n_candidate_k is a variable with the minimum value of either 10 or the number of columns of ious_in_boxes_matrix
6. topk_ious and an unused variable is assigned the top k rows of ious_in_boxes_matrix based on n_candidate_k
7. dynamic_ks is a variable assigned to the sum of each row of topk_ious, clamped to a minimum of 1, and casted to a list
8. a for loop is then used to iterate over the range of num_gt
9. for each iteration of the loop, the k smallest values of cost are found and the corresponding indices are returned
10. matching_matrix is then updated so that all the indexes returned by the topk function are set to 1
11. anchor_matching_gt is set as the sum of matching_matrix along the 0th axis
12. if the sum of anchor_matching_gt greater than one is greater than zero, the matching matrix is updated by setting all values greater than 1 to 0 and the minimum value of cost is set to 1
13. fg_mask_inboxes is set as the sum of matching_matrix along the 0th axis greater than 0
14. num_fg is set as the sum of fg_mask_inboxes
15. fg_mask is updated to reflect fg_mask_inboxes
16. matched_gt_inds is set to the argmax of matching_matrix with fg_mask_inboxes along the 1st axis
17. gt_matched_classes is set to gt_classes at the indices of matched_gt_inds
18. pred_ious_this_matching is set as the sum of matching_matrix multiplied by pair_wise_ious and indexed by fg_mask_inboxes
19. The method returns num_fg, gt_matched_classes, pred_ious_this_matching, and fg_mask in that order.

Example:
Code language: Python
Code: 
class Vehicle(object):

    def __init__(self, arg, *args, **kwargs):
        self.arg = arg
Description:
1. A new object of the class is created.
2. The value of the "arg" parameter is stored as an attribute of the object using the self keyword.
3. The values of the "args" and "kwargs" parameters are also stored as attributes of the object using the self keyword.

Generated prompt:
Description:
{}
Code: """ + function +"""
""".format(function.capitalize())
    return prompt
